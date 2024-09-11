import * as booksDB from './books'
import { CustomError } from '../errors'

type ListItem = {
  bookId: string
  ownerId: string
  rating: number
  notes: string
  startDate: number
  finishDate: number | null
}

const listItemsKey = '__bookshelf_list_items__'
let listItems: Record<string, ListItem> = {}

function persist() {
  window.localStorage.setItem(listItemsKey, JSON.stringify(listItems))
}

function load() {
  const storedListItems = window.localStorage.getItem(listItemsKey)
  if (storedListItems) {
    Object.assign(listItems, JSON.parse(storedListItems))
  }
}

// initialize
try {
  load()
} catch (error) {
  persist()
}

window.__bookshelf = window.__bookshelf || {}

window.__bookshelf.purgeListItems = () => {
  Object.keys(listItems).forEach((id) => {
    delete listItems[id]
  })
  persist()
}

async function authorize(userId: string, listItemId: string) {
  const listItem = await read(listItemId)
  if (listItem.ownerId === userId) return
  const error = new CustomError(
    'User is not authorized to access this list item',
  )
  error.status = 403
  throw error
}

async function create({
  bookId,
  ownerId,
  rating = -1,
  notes = '',
  startDate = Date.now(),
  finishDate = null,
}: {
  bookId: string
  ownerId: string
  rating?: number
  notes?: string
  startDate?: number
  finishDate?: number | null
}) {
  const id = hash(`${ownerId}-${bookId}`)
  if (listItems[id]) {
    const error = new CustomError('List item already exists')
    error.status = 400
    throw error
  }
  const book = await booksDB.read(bookId)
  if (!book) {
    const error = new CustomError(`No book found for id: ${bookId}`)
    error.status = 400
    throw error
  }
  listItems[id] = { bookId, ownerId, rating, notes, startDate, finishDate }
  persist()
  return read(id)
}

async function read(id: string) {
  validateListItem(id)
  return listItems[id]
}

async function update(id: string, updates: Partial<ListItem>) {
  validateListItem(id)
  Object.assign(listItems[id], updates)
  persist()
  return read(id)
}

async function remove(id: string) {
  validateListItem(id)
  delete listItems[id]
  persist()
}

async function readMany(userId: string, listItemIds: string[]) {
  return Promise.all(
    listItemIds.map((id) => {
      authorize(userId, id)
      return read(id)
    }),
  )
}

async function readByOwner(userId: string) {
  return Object.values(listItems).filter((item) => item.ownerId === userId)
}

async function reset() {
  listItems = {}
  persist()
}

function validateListItem(id: string) {
  load()
  if (!listItems[id]) {
    const error = new CustomError('List item not found')
    error.status = 404
    throw error
  }
}

function hash(str: string) {
  var hash = 5381,
    i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}

export { authorize, create, read, update, remove, readMany, readByOwner, reset }
