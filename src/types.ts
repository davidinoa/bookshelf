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
