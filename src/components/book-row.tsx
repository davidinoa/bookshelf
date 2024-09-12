import { Book } from '../types'
import Image from 'next/image'

type Props = {
  book: Book
}

export default function BookRow({ book }: Props) {
  const { title, author, coverImageUrl, publisher, synopsis } = book
  const id = `book-row-${book.id}`
  return (
    <div className="@container relative flex items-center justify-end">
      <div
        aria-labelledby={id}
        className="hover:box-shadow-md focus:box-shadow-md grid min-h-[270px] grow-[2] grid-cols-[100px_1fr] gap-5 rounded-md border border-gray20 p-5 text-text hover:text-inherit hover:no-underline focus:text-inherit focus:no-underline md:grid-cols-[140px_1fr]"
      >
        <div className="relative w-[100px] md:w-[140px]">
          <Image
            fill
            src={coverImageUrl}
            alt={`${title} book cover`}
            className="w-full rounded-md object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="@md:flex-row flex flex-col justify-between">
            <div className="flex-1">
              <h2 id={id} className="m-0 text-xl text-indigo">
                {title}
              </h2>
            </div>
            <div className="ml-2.5">
              <div className="mt-2 text-sm italic">{author}</div>
              <small>{publisher}</small>
            </div>
          </div>
          <small className="block whitespace-break-spaces">
            {synopsis.substring(0, 500)}...
          </small>
        </div>
      </div>
    </div>
  )
}
