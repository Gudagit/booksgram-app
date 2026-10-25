import { coverStyle } from './coverStyle'
import { useState } from 'react'
import BookDetailSheet from './BookDetailSheet'
import FavoritePicker from './FavoritePicker'
import type { Book } from './types'

const MAX_FAVORITES = 5

type FavoritesShelfProps = {
  books: Book[]
  candidates: Book[]
}

function FavoritesShelf({ books, candidates }: FavoritesShelfProps) {
  const [favorites, setFavorites] = useState(books.slice(0, MAX_FAVORITES))
  const [selected, setSelected] = useState<Book | null>(null)
  const [picking, setPicking] = useState(false)
  const [replacing, setReplacing] = useState<Book | null>(null)

  const emptySlots = MAX_FAVORITES - favorites.length
  const available = candidates.filter(
    (book) => !favorites.some((fav) => fav.title === book.title),
  )

  function startReplace() {
    setReplacing(selected)
    setSelected(null)
    setPicking(true)
  }

  function remove() {
    setFavorites(favorites.filter((fav) => fav.id !== selected?.id))
    setSelected(null)
  }

  function handlePick(book: Book) {
    if (replacing) {
      setFavorites(favorites.map((fav) => (fav.id === replacing.id ? book : fav)))
    } else {
      setFavorites([...favorites, book])
    }
  }

  function closePicker() {
    setPicking(false)
    setReplacing(null)
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Favorites</h2>
        <span className="muted">
          {favorites.length} / {MAX_FAVORITES}
        </span>
      </div>
      <div className="shelf-row fav-row">
        {favorites.map((book) => (
          <button
            key={book.id}
            type="button"
            className="fav"
            title={`${book.title}, ${book.author}`}
            onClick={() => setSelected(book)}
          >
            <span
              className={`cover ${coverStyle(book.title)} fav-cover`}
            >
              {book.title}
            </span>
          </button>
        ))}
        {Array.from({ length: emptySlots }, (_, index) => (
          <button
            key={`empty-${index}`}
            type="button"
            className="fav"
            aria-label="Add a favorite"
            onClick={() => setPicking(true)}
          >
            <span className="fav-cover fav-empty">+</span>
          </button>
        ))}
      </div>
      {selected && (
        <BookDetailSheet
          book={selected}
          onClose={() => setSelected(null)}
          onReplace={startReplace}
          onRemove={remove}
        />
      )}
      {picking && (
        <FavoritePicker
          title={replacing ? `Replace ${replacing.title}` : 'Add a favorite'}
          candidates={available}
          onPick={handlePick}
          onClose={closePicker}
        />
      )}
    </section>
  )
}

export default FavoritesShelf
