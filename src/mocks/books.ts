import { bookSchema, type Book } from '@/types'
import booksData from './books-data.json'
import { matchSorter } from 'match-sorter'

const parsedBooksData = bookSchema.array().safeParse(booksData)
const parsedBooks = parsedBooksData.success ? parsedBooksData.data : []

let books = parsedBooks

async function create(book: Book) {
  books.push(book)
  return book
}

async function read(bookId: string) {
  return books.find((book) => book.id === bookId)
}

async function readManyNotInList(bookIds: string[]) {
  return books.filter((book) => !bookIds.includes(book.id))
}

async function query(search: string) {
  return matchSorter(books, search, {
    keys: [
      'title',
      'author',
      'publisher',
      { threshold: matchSorter.rankings.CONTAINS, key: 'synopsis' },
    ],
  })
}

async function reset() {
  books = [...parsedBooks]
}

export { create, read, readManyNotInList, query, reset }
