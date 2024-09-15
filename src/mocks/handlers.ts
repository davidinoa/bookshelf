import {
  http,
  HttpResponse,
  type AsyncResponseResolverReturnType,
  type DefaultBodyType,
  type HttpResponseResolver,
  type PathParams,
  type StrictRequest,
  type StrictResponse,
} from 'msw'
import * as booksDB from './data/books'
import * as usersDB from './data/users'
import * as listItemsDB from './data/list-items'
import type { Book } from '@/types'
import { CustomError } from './errors'
import { match } from 'node-match-path'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

let sleep: (t?: number) => Promise<void>
if (process.env.CI) {
  sleep = () => Promise.resolve()
} else if (process.env.NODE_ENV === 'test') {
  sleep = () => Promise.resolve()
} else {
  sleep = (t = Math.random() * 1000) =>
    new Promise((resolve) => setTimeout(resolve, t))
}

function withErrorHandling<
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
>(
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (...args) => {
    const { request } = args[0]
    try {
      if (shouldFail(request)) {
        throw new CustomError('Request failure (for testing purposes).', 500)
      }
      return await resolver(...args)
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.json(
          {
            message: error.message,
            status: error.status,
          },
          {
            status: error.status,
          },
        ) as unknown as StrictResponse<ResponseBodyType>
      }
      // fix this
      return HttpResponse.json(null, {
        status: 500,
      }) as StrictResponse<ResponseBodyType>
    } finally {
      await sleep()
    }
  }
}

export const handlers = [
  http.get<never, Request, { books: Book[] }>(
    `${apiUrl}/books`,
    withErrorHandling(async ({ request }) => {
      const url = new URL(request.url)
      const query = url.searchParams.get('query')
      if (!query) {
        throw new CustomError('No query provided', 400)
      }

      let matchingBooks = [] as Book[]
      if (query.length) {
        matchingBooks = await booksDB.query(query)
      } else {
        if (getToken(request)) {
          const user = await getUser(request)
          const allBooks = await getBooksNotInUserList(user.id)
          matchingBooks = allBooks.slice(0, 10)
        } else {
          const allBooks = await booksDB.readManyNotInList([])
          matchingBooks = allBooks.slice(0, 10)
        }
      }
      return HttpResponse.json({ books: matchingBooks })
    }),
  ),
]

function getToken(request: Request) {
  return request.headers.get('Authorization')?.replace('Bearer ', '')
}

async function getUser(request: Request) {
  const token = getToken(request)
  if (!token) {
    const error = new CustomError('No token provided', 401)
    throw error
  }
  let userId
  try {
    userId = atob(token)
  } catch (err) {
    const error = new CustomError('Invalid token', 401)
    throw error
  }
  const user = await usersDB.read(userId)
  return user
}

async function getBooksNotInUserList(userId: string) {
  const bookIdsInUserList = (await listItemsDB.readByOwner(userId)).map(
    (li) => li.bookId,
  )
  const booksNotInUserList = await booksDB.readManyNotInList(bookIdsInUserList)
  return booksNotInUserList
}

function shouldFail<RequestBodyType extends DefaultBodyType>(
  request: StrictRequest<RequestBodyType>,
) {
  const url = new URL(request.url)
  if (JSON.stringify(request.body).includes('FAIL')) return true
  if (url.searchParams.toString().includes('FAIL')) return true
  if (process.env.NODE_ENV === 'test') return false
  const failureRate = Number(
    window.localStorage.getItem('__bookshelf_failure_rate__') ?? 0,
  )
  if (Math.random() < failureRate) return true
  if (requestMatchesFailConfig(request)) return true
  return false
}

function requestMatchesFailConfig<RequestBodyType extends DefaultBodyType>(
  request: StrictRequest<RequestBodyType>,
) {
  const url = new URL(request.url)
  function configMatches({
    requestMethod,
    urlMatch,
  }: {
    requestMethod: string
    urlMatch: string
  }) {
    return (
      (requestMethod === 'ALL' || requestMethod === request.method) &&
      match(urlMatch, url.pathname).matches
    )
  }
  try {
    const failConfig = JSON.parse(
      window.localStorage.getItem('__bookshelf_request_fail_config__') ?? '[]',
    )
    if (failConfig.some(configMatches)) return true
  } catch (error) {
    window.localStorage.removeItem('__bookshelf_request_fail_config__')
  }
  return false
}
