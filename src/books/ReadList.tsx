import Stars from './Stars'
import type { Book } from './types'

type ReadListProps = {
  books: Book[]
}

function ReadList({ books }: ReadListProps) {
  if (books.length === 0) {
    return <p className="empty">Nothing here yet.</p>
  }

  return (
    <div>
      {books.map((book) => (
        <article key={book.id} className="review">
          <div
            className="cover review-cover"
            style={{ backgroundColor: book.color }}
          >
            {book.title}
          </div>
          <div>
            <p className="review-title">{book.title}</p>
            <p className="review-author">{book.author}</p>
            {book.rating !== undefined && <Stars rating={book.rating} />}
            {book.comment && <p className="review-quote">{book.comment}</p>}
          </div>
        </article>
      ))}
    </div>
  )
}

export default ReadList
