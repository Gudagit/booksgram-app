import { useState } from 'react'
import { Link } from 'react-router'
import AddBookSheet from './AddBookSheet'
import { getKnownBooks } from './knownBooks'
import type { KnownBook } from './knownBooks'
import ReviewSheet from './ReviewSheet'
import { shelfLabels, useShelves } from './useShelves'
import type { ShelfKey } from './useShelves'

const books = getKnownBooks()

function SearchPage() {
  const { addBook, removeBook, shelfOf } = useShelves()
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<KnownBook | null>(null)
  const [reviewing, setReviewing] = useState<KnownBook | null>(null)
  const [added, setAdded] = useState<string | null>(null)

  const text = query.trim().toLowerCase()
  const results = books.filter(
    (book) =>
      book.title.toLowerCase().includes(text) ||
      book.author.toLowerCase().includes(text),
  )

  function handlePick(shelf: ShelfKey) {
    if (!picked) return
    if (shelf === 'read') {
      setReviewing(picked)
      setPicked(null)
      return
    }
    addBook(shelf, {
      id: String(Date.now()),
      title: picked.title,
      author: picked.author,
      color: picked.color,
    })
    setAdded(`"${picked.title}" is now on your ${shelfLabels[shelf]} shelf.`)
    setPicked(null)
  }

  function handleRemove() {
    if (!picked) return
    removeBook(picked)
    setAdded(`"${picked.title}" was removed from your shelves.`)
    setPicked(null)
  }

  return (
    <main className="feed search">
      <header className="search-hero">
        <h1>Search</h1>
        <p>Find a book and put it on one of your shelves.</p>
      </header>
      <input
        type="search"
        value={query}
        placeholder="Title or author"
        aria-label="Search books"
        onChange={(event) => setQuery(event.target.value)}
      />

      {added && (
        <p className="search-added" role="status">
          {added} <Link to="/profile">View profile</Link>
        </p>
      )}

      {text === '' ? (
        <div className="search-empty">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M32 16c-5-3-12-4-21-3v36c9-1 16 0 21 3 5-3 12-4 21-3V13c-9-1-16 0-21 3z" />
            <path d="M32 16v36" />
            <path d="M17 23c4-.4 8 0 11 1.4M17 31c4-.4 8 0 11 1.4M36 24.4c3-1.4 7-1.8 11-1.4M36 32.4c3-1.4 7-1.8 11-1.4" />
          </svg>
          <p>Type a title or an author to find a book.</p>
        </div>
      ) : results.length === 0 ? (
        <p className="muted">No books found for "{query}".</p>
      ) : (
        <>
          <p className="muted">
            {results.length} {results.length === 1 ? 'book' : 'books'} found
          </p>
          <ul className="search-results">
            {results.map((book) => {
              const shelf = shelfOf(book)
              return (
                <li key={`${book.title}|${book.author}`}>
                  <button
                    type="button"
                    className="search-result"
                    onClick={() => setPicked(book)}
                  >
                    <span
                      className="search-cover"
                      style={{ background: book.color }}
                    />
                    <span className="search-text">
                      <strong>{book.title}</strong>
                      <span>{book.author}</span>
                    </span>
                    {shelf && (
                      <span className="shelf-badge">{shelfLabels[shelf]}</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}

      {picked && (
        <AddBookSheet
          book={picked}
          current={shelfOf(picked)}
          onPick={handlePick}
          onRemove={handleRemove}
          onClose={() => setPicked(null)}
        />
      )}
      {reviewing && (
        <ReviewSheet
          book={reviewing}
          onSave={(book) => {
            addBook('read', book)
            setAdded(`"${book.title}" is now on your Read shelf.`)
          }}
          onClose={() => setReviewing(null)}
        />
      )}
    </main>
  )
}

export default SearchPage
