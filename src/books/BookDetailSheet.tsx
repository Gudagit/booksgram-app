import ReviewBody from './ReviewBody'
import Stars from './Stars'
import type { Book } from './types'

type BookDetailSheetProps = {
  book: Book
  onClose: () => void
  onReplace?: () => void
  onRemove?: () => void
}

function BookDetailSheet({
  book,
  onClose,
  onReplace,
  onRemove,
}: BookDetailSheetProps) {
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <section
        className="panel sheet"
        role="dialog"
        aria-label={book.title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="panel-head">
          <h2>{book.title}</h2>
          <button
            type="button"
            className="sheet-close"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="review">
          <div
            className="cover review-cover"
            style={{ backgroundColor: book.color }}
          >
            {book.title}
          </div>
          <div>
            <p className="review-author">{book.author}</p>
            {book.rating !== undefined && <Stars rating={book.rating} />}
            <ReviewBody book={book} />
          </div>
        </div>

        {(onReplace || onRemove) && (
          <div className="sheet-actions">
            {onReplace && (
              <button type="button" className="button" onClick={onReplace}>
                Replace
              </button>
            )}
            {onRemove && (
              <button type="button" className="button ghost" onClick={onRemove}>
                Remove
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default BookDetailSheet
