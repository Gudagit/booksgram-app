import Sheet from '../layout/Sheet'
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
    <Sheet title={book.title} onClose={onClose}>
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
    </Sheet>
  )
}

export default BookDetailSheet
