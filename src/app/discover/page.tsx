'use client'

import BookRow from '@/components/book-row'
import { BookList, Input, Spinner } from '@/components/lib'
import type { Book } from '@/types'
import { client } from '@/utils/api-client'
import { Tooltip } from '@reach/tooltip'
import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

type SearchStatus = 'idle' | 'loading' | 'success' | 'error'

export default function DiscoverPage() {
  const [query, setQuery] = useState('')
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('idle')
  const [data, setData] = useState<{ books: Book[] }>({ books: [] })
  const [queried, setQueried] = useState(false)

  useEffect(() => {
    if (!queried) return
    setSearchStatus('loading')
    client(`books?query=${encodeURIComponent(query)}`)
      .then((data) => {
        setData(data)
        setSearchStatus('success')
      })
      .catch(() => setSearchStatus('error'))
  }, [queried, query])

  const isLoading = searchStatus === 'loading'
  const isSuccess = searchStatus === 'success'

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
              <button className="relative -ml-[35px] border-0 bg-transparent">
                {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
              </button>
            </label>
          </Tooltip>
        </div>
      </form>

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
