import { http, HttpResponse } from 'msw'
import * as booksDB from './data/books'
import * as usersDB from './data/users'
import * as listItemsDB from './data/list-items'
import type { Book } from '@/types'
import { CustomError } from './errors'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const handlers = [
  http.get<never, Request, { books: Book[] }>(
    `${apiUrl}/books`,
    async ({ request }) => {
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
    },
  ),
]

function getToken(request: Request) {
  return request.headers.get('Authorization')?.replace('Bearer ', '')
}

async function getUser(request: Request) {
  const token = getToken(request)
  if (!token) {
    const error = new CustomError('No token provided')
    error.status = 401
    throw error
  }
  let userId
  try {
    userId = atob(token)
  } catch (err) {
    const error = new CustomError('Invalid token')
    error.status = 401
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
