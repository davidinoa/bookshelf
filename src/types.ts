import { z } from 'zod'

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  coverImageUrl: z.string(),
  publisher: z.string(),
  synopsis: z.string(),
  pageCount: z.number(),
})

export type Book = z.infer<typeof bookSchema>

const authFormDataSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export type AuthFormData = z.infer<typeof authFormDataSchema>
