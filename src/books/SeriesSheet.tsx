import { useState } from 'react'
import Sheet from '../layout/Sheet'
import Stars from './Stars'
import type { Series, SeriesEntry } from './types'

type SeriesSheetProps = {
  series: Series
  onClose: () => void
}

const statusLabels: Record<SeriesEntry['status'], string> = {
  read: 'Read',
  current: 'Reading',
  next: 'Up next',
  upcoming: 'Upcoming',
}

function SeriesSheet({ series, onClose }: SeriesSheetProps) {
  const [selected, setSelected] = useState<SeriesEntry | undefined>(
    series.entries.find((entry) => entry.status === 'current'),
  )

  return (
    <Sheet title={series.name} onClose={onClose}>
      <div className="shelf-row series-row">
        {series.entries.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={`series-item ${entry.status} ${selected?.id === entry.id ? 'selected' : ''}`}
            onClick={() => setSelected(entry)}
          >
            <span
              className="cover series-cover"
              style={{ backgroundColor: entry.color }}
            >
              {entry.title}
            </span>
            <span className="series-order">Book {entry.order}</span>
            <span className="series-status">{statusLabels[entry.status]}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="series-detail">
          <p className="review-title">{selected.title}</p>
          <p className="review-author">{selected.author}</p>
          {selected.rating !== undefined && <Stars rating={selected.rating} />}
          {selected.comment && <p className="review-quote">{selected.comment}</p>}
          {selected.status === 'upcoming' && (
            <p className="muted">
              {selected.releaseDate
                ? `Expected ${selected.releaseDate}`
                : 'Release date not announced'}
            </p>
          )}
        </div>
      )}
    </Sheet>
  )
}

export default SeriesSheet
