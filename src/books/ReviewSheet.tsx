import { useState } from 'react'
import ChipChoice from '../layout/ChipChoice'
import EditRow from '../layout/EditRow'
import EditSection from '../layout/EditSection'
import Sheet from '../layout/Sheet'
import { tagGroups } from './bookTags'
import { getKnownBooks } from './knownBooks'
import Stars from './Stars'
import SuggestInput from './SuggestInput'
import type { Suggestion } from './SuggestInput'
import type { Book } from './types'

const known = getKnownBooks()
const authors = [...new Set(known.map((book) => book.author))]

const MAX_LIKED = 500
const ratingValues = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
const colors = ['tomato', 'steelblue', 'seagreen', 'darkorchid', 'goldenrod', 'slategray']

type ReviewSheetProps = {
  onSave: (book: Book) => void
  onClose: () => void
}

type Field = 'title' | 'author' | 'rating' | 'liked' | `group:${string}`

function ReviewSheet({ onSave, onClose }: ReviewSheetProps) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(3)
  const [liked, setLiked] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [spoiler, setSpoiler] = useState(false)
  const [pickedColor, setPickedColor] = useState<string>()
  const [field, setField] = useState<Field | null>(null)

  const typedTitle = title.trim().toLowerCase()
  const typedAuthor = author.trim().toLowerCase()
  const canSave = title.trim() !== '' && author.trim() !== ''

  const titleSuggestions: Suggestion[] = typedTitle
    ? known
        .filter(
          (book) =>
            book.title.toLowerCase().includes(typedTitle) &&
            book.title.toLowerCase() !== typedTitle,
        )
        .slice(0, 5)
        .map((book) => ({ key: book.title, label: book.title, sub: book.author }))
    : []

  const authorSuggestions: Suggestion[] = typedAuthor
    ? authors
        .filter(
          (name) =>
            name.toLowerCase().includes(typedAuthor) &&
            name.toLowerCase() !== typedAuthor,
        )
        .slice(0, 5)
        .map((name) => ({ key: name, label: name }))
    : []

  function toggleTag(tag: string) {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    )
  }

  function pickBook(key: string) {
    const book = known.find((item) => item.title === key)
    if (!book) return
    setTitle(book.title)
    setAuthor(book.author)
    setPickedColor(book.color)
  }

  function handleSave() {
    if (!canSave) return

    onSave({
      id: String(Date.now()),
      title: title.trim(),
      author: author.trim(),
      color: pickedColor ?? colors[title.length % colors.length],
      rating,
      comment: liked.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined,
      spoiler,
    })
    onClose()
  }

  function groupSummary(groupTags: string[]) {
    const chosen = tags.filter((tag) => groupTags.includes(tag))
    if (chosen.length === 0) return 'None chosen'
    const shown = chosen.slice(0, 3).join(', ')
    return chosen.length > 3 ? `${shown} +${chosen.length - 3}` : shown
  }

  if (field === null) {
    return (
      <Sheet title="Write a review" onClose={onClose}>
        <EditSection title="The book">
          <EditRow
            label="Title"
            value={title.trim() || 'Required'}
            tone={title.trim() ? undefined : 'hint'}
            onClick={() => setField('title')}
          />
          <EditRow
            label="Author"
            value={author.trim() || 'Required'}
            tone={author.trim() ? undefined : 'hint'}
            onClick={() => setField('author')}
          />
        </EditSection>

        <EditSection title="Your review">
          <EditRow
            label="Rating"
            value={`${rating} of 5`}
            trailing={<Stars rating={rating} />}
            onClick={() => setField('rating')}
          />
          <EditRow
            label="What did you like?"
            value={liked.trim() || 'Optional'}
            tone={liked.trim() ? undefined : 'hint'}
            onClick={() => setField('liked')}
          />
          <EditRow
            label="Contains spoilers"
            value={spoiler ? 'Yes, the text is blurred' : 'No'}
            trailing={
              <span
                className={spoiler ? 'switch on' : 'switch'}
                aria-hidden="true"
              />
            }
            onClick={() => setSpoiler(!spoiler)}
          />
        </EditSection>

        <EditSection title="Tags">
          {tagGroups.map((group) => (
            <EditRow
              key={group.name}
              label={group.name}
              value={groupSummary(group.tags)}
              tone={
                tags.some((tag) => group.tags.includes(tag)) ? undefined : 'hint'
              }
              onClick={() => setField(`group:${group.name}`)}
            />
          ))}
        </EditSection>

        <div className="sheet-actions">
          <button
            type="button"
            className="button"
            disabled={!canSave}
            onClick={handleSave}
          >
            Save review
          </button>
          <button type="button" className="button ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
        {!canSave && <p className="muted">Add a title and an author to save.</p>}
      </Sheet>
    )
  }

  const group = field.startsWith('group:')
    ? tagGroups.find((item) => `group:${item.name}` === field)
    : undefined
  const heading =
    field === 'title'
      ? 'Title'
      : field === 'author'
        ? 'Author'
        : field === 'rating'
          ? 'Rating'
          : field === 'liked'
            ? 'What did you like?'
            : (group?.name ?? 'Tags')

  return (
    <Sheet title={heading} onClose={onClose} onBack={() => setField(null)}>
      {field === 'title' && (
        <SuggestInput
          label="Book title"
          value={title}
          required
          onChange={(value) => {
            setTitle(value)
            setPickedColor(undefined)
          }}
          suggestions={titleSuggestions}
          onPick={pickBook}
        />
      )}

      {field === 'author' && (
        <SuggestInput
          label="Author"
          value={author}
          required
          onChange={setAuthor}
          suggestions={authorSuggestions}
          onPick={setAuthor}
        />
      )}

      {field === 'rating' && (
        <>
          <Stars rating={rating} />
          <div className="rating-grid">
            {ratingValues.map((value) => (
              <button
                key={value}
                type="button"
                className="chip chip-toggle"
                aria-pressed={rating === value}
                onClick={() => setRating(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </>
      )}

      {field === 'liked' && (
        <div className="field">
          <label htmlFor="review-liked">Your thoughts on the book</label>
          <textarea
            id="review-liked"
            rows={7}
            value={liked}
            maxLength={MAX_LIKED}
            autoFocus
            onChange={(event) => setLiked(event.target.value)}
          />
          <p className="muted char-count">
            {liked.length} / {MAX_LIKED}
          </p>
        </div>
      )}

      {group && (
        <>
          <p className="muted">Choose everything that fits.</p>
          <ChipChoice
            options={group.tags}
            selected={tags}
            onToggle={toggleTag}
          />
        </>
      )}

      <div className="sheet-actions">
        <button type="button" className="button" onClick={() => setField(null)}>
          Done
        </button>
      </div>
    </Sheet>
  )
}

export default ReviewSheet
