import { coverStyle } from './coverStyle'
import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Link } from 'react-router'
import AddBookSheet from './AddBookSheet'
import type { KnownBook } from './knownBooks'
import ReviewSheet from './ReviewSheet'
import { useBookSearch } from './useBookSearch'
import { shelfLabels, useShelves } from './useShelves'
import type { ShelfKey } from './useShelves'

function SearchPage() {
  const { addBook, removeBook, shelfOf } = useShelves()
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<KnownBook | null>(null)
  const [reviewing, setReviewing] = useState<KnownBook | null>(null)
  const [added, setAdded] = useState<string | null>(null)

  const text = query.trim()
  const { results, pool, loading, loadingMore, failed, tooShort } = useBookSearch(query)

  // the grey rest of a title or author that starts with what was typed so far
  const typed = query.toLowerCase()
  const suggestion =
    typed.trim().length >= 2
      ? pool
          .flatMap((book) => [book.title, book.author.split(', ')[0]])
          .find((name) => name.length > typed.length && name.toLowerCase().startsWith(typed))
      : undefined
  const ghostRest = suggestion ? suggestion.slice(query.length) : ''

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const atEnd = event.currentTarget.selectionStart === query.length
    if ((event.key === 'Tab' || event.key === 'ArrowRight') && suggestion && atEnd) {
      event.preventDefault()
      setQuery(suggestion)
    }
  }

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
      <div className="search-box">
        <input
          type="search"
          value={query}
          placeholder="Title or author"
          aria-label="Search books"
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        {suggestion && (
          <div className="search-ghost" aria-hidden="true">
            <span className="ghost-typed">{query}</span>
            <span className="ghost-rest" onClick={() => setQuery(suggestion)}>
              {ghostRest}
            </span>
          </div>
        )}
      </div>

      {added && (
        <p className="search-added" role="status">
          {added} <Link to="/">View profile</Link>
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
      ) : tooShort ? (
        <p className="muted">Type at least 2 letters.</p>
      ) : loading || (results.length === 0 && loadingMore) ? (
        <p className="muted" role="status">
          Searching…
        </p>
      ) : failed ? (
        <p className="muted" role="status">
          Search is not available right now. Check your connection and try again.
        </p>
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
                      className={`search-cover ${coverStyle(book.title)}`}
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
          {loadingMore && (
            <p className="muted" role="status">
              Looking for more books…
            </p>
          )}
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
