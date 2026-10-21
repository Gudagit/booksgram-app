import BookCard from './BookCard'
import type { Book } from './types'

type BookShelfProps = {
  books: Book[]
}

function BookShelf({ books }: BookShelfProps) {
  if (books.length === 0) {
    return <p className="empty">Nothing here yet.</p>
  }

  return (
    <div className="grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          color={book.color}
        />
      ))}
    </div>
  )
}

export default BookShelf
