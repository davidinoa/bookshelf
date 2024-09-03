'use client'

import BookRow from '@/components/book-row'
import { BookList, Input, Spinner } from '@/components/lib'
import type { Book } from '@/types'
import { Tooltip } from '@reach/tooltip'
import { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function DiscoverPage() {
  const data = {
    books: [] as Book[],
  }
  const isLoading = false
  const isSuccess = false

  async function getUser() {
    const response = await fetch('https://api.example.com/user')
    const user = (await response.json()) as {
      firstName: string
      lastName: string
    }
    return user
  }

  useEffect(() => {
    getUser()
  }, [])

  function handleSearchSubmit(_event: React.FormEvent<HTMLFormElement>) {}

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
