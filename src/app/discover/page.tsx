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
    window
      .fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/books?query=${query}`,
      )
      .then((response) => {
        console.log(response)
      })
  }, [queried, query])

  const isLoading = false
  const isSuccess = false

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
        <Input id="search" placeholder="Search books..." className="w-full" />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button className="relative -ml-[35px] border-0 bg-transparent">
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {isSuccess ? (
        data?.books?.length ? (
          <BookList>
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
