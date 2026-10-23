import { useState } from 'react'
import Sheet from '../layout/Sheet'
import type { Book } from './types'

type FavoritePickerProps = {
  title: string
  candidates: Book[]
  onPick: (book: Book) => void
  onClose: () => void
}

function FavoritePicker({
  title,
  candidates,
  onPick,
  onClose,
}: FavoritePickerProps) {
  const [query, setQuery] = useState('')
  const typed = query.trim().toLowerCase()

  const matches = candidates.filter(
    (book) =>
      book.title.toLowerCase().includes(typed) ||
      book.author.toLowerCase().includes(typed),
  )

  return (
    <Sheet title={title} onClose={onClose}>
      <div className="field">
        <label htmlFor="favorite-search">Search your books</label>
        <input
          id="favorite-search"
          value={query}
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {matches.length === 0 ? (
        <p className="empty">No books found on your shelves.</p>
      ) : (
        <ul className="pick-list">
          {matches.map((book) => (
            <li key={book.id}>
              <button
                type="button"
                onClick={() => {
                  onPick(book)
                  onClose()
                }}
              >
                {book.title}
                <span className="suggest-sub">{book.author}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Sheet>
  )
}

export default FavoritePicker
