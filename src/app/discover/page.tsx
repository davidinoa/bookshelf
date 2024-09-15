'use client'

import BookRow from '@/components/book-row'
import { BookList, Input, Spinner } from '@/components/lib'
import type { Book } from '@/types'
import { client } from '@/utils/api-client'
import { Tooltip } from '@reach/tooltip'
import { useEffect, useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

type SearchStatus = 'idle' | 'loading' | 'success' | 'error'

type Error = {
  message: string
}

export default function DiscoverPage() {
  const [query, setQuery] = useState('')
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('idle')
  const [data, setData] = useState<{ books: Book[] }>({ books: [] })
  const [error, setError] = useState<Error | null>(null)
  const [queried, setQueried] = useState(false)

  useEffect(() => {
    setError(null)
    if (!queried) return
    setSearchStatus('loading')
    client(`books?query=${encodeURIComponent(query)}`)
      .then((data) => {
        setData(data)
        setSearchStatus('success')
      })
      .catch((err) => {
        setError(err)
        setSearchStatus('error')
      })
  }, [queried, query])

  const isLoading = searchStatus === 'loading'
  const isSuccess = searchStatus === 'success'
  const isError = searchStatus === 'error'

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formElements = event.currentTarget.elements
    const searchElement = formElements.namedItem('search')
    if (!(searchElement instanceof HTMLInputElement)) {
      throw new Error('Expected search input element')
    }
    setQuery(searchElement.value)
    setQueried(true)
  }

  return (
    <div className="m-auto w-[90vw] max-w-[800px] py-10">
      <form onSubmit={handleSearchSubmit}>
        <div className="flex items-center">
          <Input id="search" placeholder="Search books..." className="w-full" />
          <Tooltip label="Search Books">
            <label htmlFor="search">
              <button className="relative -ml-[35px] mt-1 border-0 bg-transparent">
                {isLoading ? (
                  <Spinner />
                ) : isError ? (
                  <FaTimes aria-label="error" className="text-danger" />
                ) : (
                  <FaSearch aria-label="search" />
                )}
              </button>
            </label>
          </Tooltip>
        </div>
      </form>

      {isError && error ? (
        <div className="text-danger">
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.books?.length ? (
          <BookList className="mt-4">
            {data.books.map((book) => (
              <li key={book.id} aria-label={book.title}>
                <BookRow book={book} />
              </li>
            ))}
          </BookList>
        ) : (
          <p> No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}
