import { z } from 'zod'

export const bookSchema = z.object({
  id: z.string(),
  title: z.coerce.string(),
  author: z.string(),
  coverImageUrl: z.string(),
  publisher: z.string(),
  synopsis: z.string(),
  pageCount: z.number(),
})

export type Book = z.infer<typeof bookSchema>

export const authFormDataSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export type AuthFormData = z.infer<typeof authFormDataSchema>
