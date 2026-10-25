import { coverStyle } from './coverStyle'
type BookCardProps = {
  title: string
  author: string
  color: string
  onSeries?: () => void
  onRemove?: () => void
}

function BookCard({ title, author, onSeries, onRemove }: BookCardProps) {
  return (
    <div className="book-card">
      <div className={`cover ${coverStyle(title)} book-card-cover`}>
        {title}
      </div>
      {onSeries && (
        <button
          type="button"
          className="series-btn"
          aria-label="Show series"
          onClick={onSeries}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="4" height="14" rx="1" />
            <rect x="9" y="5" width="4" height="14" rx="1" />
            <path d="m15.5 6.5 3.8-1 3 12-3.8 1z" />
          </svg>
        </button>
      )}
      <p className="book-card-title">{title}</p>
      <p className="book-card-author">{author}</p>
      {onRemove && (
        <button type="button" className="remove-link" onClick={onRemove}>
          Remove
        </button>
      )}
    </div>
  )
}

export default BookCard
