import { useState } from 'react'
import type { Book } from './types'

type ReviewBodyProps = {
  book: Book
}

function ReviewBody({ book }: ReviewBodyProps) {
  const [revealed, setRevealed] = useState(false)
  const hidden = book.spoiler && !revealed

  return (
    <>
      {book.tags && (
        <div className="chips tag-list">
          {book.tags.map((tag) => (
            <span key={tag} className="chip chip-small">
              {tag}
            </span>
          ))}
        </div>
      )}
      {book.comment && (
        <div className="review-quote">
          <p className={hidden ? 'blurred' : undefined}>{book.comment}</p>
          {hidden && (
            <button
              type="button"
              className="link-btn"
              onClick={() => setRevealed(true)}
            >
              Spoiler, tap to show
            </button>
          )}
        </div>
      )}
      <button type="button" className="link-btn recommend">
        Recommend to a friend
      </button>
    </>
  )
}

export default ReviewBody
