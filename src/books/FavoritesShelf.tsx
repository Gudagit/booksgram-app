import type { Book } from './types'

const MAX_FAVORITES = 7

type FavoritesShelfProps = {
  books: Book[]
}

function FavoritesShelf({ books }: FavoritesShelfProps) {
  const shown = books.slice(0, MAX_FAVORITES)

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Favorites</h2>
        <span className="muted">
          {shown.length} / {MAX_FAVORITES}
        </span>
      </div>
      <div className="shelf-row">
        {shown.map((book) => (
          <div key={book.id} className="fav" title={`${book.title}, ${book.author}`}>
            <div
              className="cover fav-cover"
              style={{ backgroundColor: book.color }}
            >
              {book.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FavoritesShelf
