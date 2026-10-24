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
        <span className="search-cover" style={{ background: book.color }} />
        <div>
          <strong>{book.title}</strong>
          <span className="muted">{book.author}</span>
        </div>
      </div>

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
