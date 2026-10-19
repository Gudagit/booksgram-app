import BookCard from './BookCard'
import type { Book } from './types'

type BookShelfProps = {
  title: string
  books: Book[]
}

function BookShelf({ title, books }: BookShelfProps) {
  return (
    <section>
      <h2>{title}</h2>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            color={book.color}
          />
        ))}
      </div>
    </section>
  )
}

export default BookShelf
