import BookCard from './BookCard'
import type { Book } from './types'

type BookShelfProps = {
  books: Book[]
  onSeries?: (book: Book) => void
  onRemove?: (book: Book) => void
}

function BookShelf({ books, onSeries, onRemove }: BookShelfProps) {
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
          onSeries={book.seriesId && onSeries ? () => onSeries(book) : undefined}
          onRemove={onRemove ? () => onRemove(book) : undefined}
        />
      ))}
    </div>
  )
}

export default BookShelf
