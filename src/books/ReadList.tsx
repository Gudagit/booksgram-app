import { coverStyle } from './coverStyle'
import ReviewBody from './ReviewBody'
import Stars from './Stars'
import type { Book } from './types'

type ReadListProps = {
  books: Book[]
  onRemove?: (book: Book) => void
}

function ReadList({ books, onRemove }: ReadListProps) {
  if (books.length === 0) {
    return <p className="empty">Nothing here yet.</p>
  }

  return (
    <div>
      {books.map((book) => (
        <article key={book.id} className="review">
          <div
            className={`cover ${coverStyle(book.title)} review-cover`}
          >
            {book.title}
          </div>
          <div>
            <p className="review-title">{book.title}</p>
            <p className="review-author">{book.author}</p>
            {book.rating !== undefined && <Stars rating={book.rating} />}
            <ReviewBody book={book} />
            {onRemove && (
              <button
                type="button"
                className="remove-link"
                onClick={() => onRemove(book)}
              >
                Remove
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

export default ReadList
