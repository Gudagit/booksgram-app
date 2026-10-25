import { coverStyle } from './coverStyle'
import Sheet from '../layout/Sheet'
import type { KnownBook } from './knownBooks'
import { shelfLabels } from './useShelves'
import type { ShelfKey } from './useShelves'

type AddBookSheetProps = {
  book: KnownBook
  current?: ShelfKey
  onPick: (shelf: ShelfKey) => void
  onRemove: () => void
  onClose: () => void
}

const choices: { key: ShelfKey; label: string }[] = [
  { key: 'read', label: 'I have read it' },
  { key: 'reading', label: 'I am reading it' },
  { key: 'tbr', label: 'I want to read it' },
]

function AddBookSheet({
  book,
  current,
  onPick,
  onRemove,
  onClose,
}: AddBookSheetProps) {
  return (
    <Sheet title="Add to your shelf" onClose={onClose}>
      <div className="add-book">
        <span className={`search-cover ${coverStyle(book.title)}`} />
        <div>
          <strong>{book.title}</strong>
          <span className="muted">{book.author}</span>
        </div>
      </div>

      {book.tags.length > 0 && (
        <ul className="add-tags" aria-label="Tags">
          {book.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
      )}

      <section className="add-opinions" aria-label="What readers say">
        <h3>What readers say</h3>
        {book.opinions.length === 0 ? (
          <p className="muted">
            No reader notes yet. Mark it as read and tell others what you
            thought.
          </p>
        ) : (
          book.opinions.slice(0, 3).map((opinion) => (
            <blockquote key={opinion.text}>
              <p>{opinion.text}</p>
              <footer>
                {opinion.by}
                {opinion.rating !== undefined && ` · ${opinion.rating} of 5`}
              </footer>
            </blockquote>
          ))
        )}
      </section>

      {current && (
        <p className="muted">
          Now on your {shelfLabels[current]} shelf. Choosing another one moves it.
        </p>
      )}
      <p className="muted">
        Choosing "I have read it" opens a short review form.
      </p>

      <div className="sheet-actions shelf-choices">
        {choices.map((choice) => (
          <button
            key={choice.key}
            type="button"
            className="button"
            disabled={choice.key === current}
            onClick={() => onPick(choice.key)}
          >
            {choice.label}
          </button>
        ))}
        {current && (
          <button type="button" className="button ghost" onClick={onRemove}>
            Remove from my shelves
          </button>
        )}
        <button type="button" className="button ghost" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Sheet>
  )
}

export default AddBookSheet
