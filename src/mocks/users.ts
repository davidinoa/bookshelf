import type { AuthFormData } from '@/types'
import { CustomError } from './errors'

declare global {
  interface Window {
    __bookshelf: {
      purgeUsers: () => void
    }
  }
}

type User = {
  id: string
  username: string
  passwordHash: string
}

const usersKey = '__bookshelf_users__'
let users: Record<string, User> = {}

function persist() {
  window.localStorage.setItem(usersKey, JSON.stringify(users))
}

function load() {
  const storedUsers = window.localStorage.getItem(usersKey)
  if (storedUsers) {
    Object.assign(users, JSON.parse(storedUsers))
  }
}

// initialize
try {
  load()
} catch (error) {
  persist()
}

window.__bookshelf = window.__bookshelf || {}

window.__bookshelf.purgeUsers = () => {
  Object.keys(users).forEach((id) => {
    delete users[id]
  })
  persist()
}

async function read(id: string) {
  validateUser(id)
  return sanitizeUser(users[id])
}
async function create({ username, password }: AuthFormData) {
  validateUserForm({ username, password })
  const id = hash(username)
  const passwordHash = hash(password)
  if (users[id]) {
    const error = new CustomError(
      `User already exists with username: ${username}`,
    )
    error.status = 400
    throw error
  }
  users[id] = { id, username, passwordHash }
  persist()
  return read(id)
}

async function update(id: string, updates: Partial<User>) {
  validateUser(id)
  Object.assign(users[id], updates)
  persist()
  return read(id)
}

async function remove(id: string) {
  validateUser(id)
  delete users[id]
  persist()
}

async function reset() {
  users = {}
  persist()
}

async function authenticate({ username, password }: AuthFormData) {
  validateUserForm({ username, password })
  const id = hash(username)
  const user = users[id] || {}
  if (user.passwordHash !== hash(password)) {
    const error = new CustomError('Invalid username or password')
    error.status = 401
    throw error
  }
  return { ...sanitizeUser(user), token: btoa(user.id) }
}

async function validateUser(id: string) {
  load()
  if (!users[id]) {
    const error = new CustomError(`User not found with id: ${id}`)
    error.status = 404
    throw error
  }
}

function validateUserForm({ username, password }: AuthFormData) {
  if (!username.length) {
    const error = new CustomError('Username is required')
    error.status = 400
    throw error
  }
  if (!password.length) {
    const error = new CustomError('Password is required')
    error.status = 400
    throw error
  }
}

function sanitizeUser(user: User) {
  const { passwordHash, ...rest } = user
  return rest
}

function hash(str: string) {
  var hash = 5381,
    i = str.length
  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}

export { create, read, update, remove, reset, authenticate }
