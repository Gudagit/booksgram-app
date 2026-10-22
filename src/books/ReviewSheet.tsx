import { useState } from 'react'
import type { FormEvent } from 'react'
import { getKnownBooks } from './knownBooks'
import Stars from './Stars'
import SuggestInput from './SuggestInput'
import TagPicker from './TagPicker'
import type { Suggestion } from './SuggestInput'
import type { Book } from './types'

const known = getKnownBooks()
const authors = [...new Set(known.map((book) => book.author))]

type ReviewSheetProps = {
  onSave: (book: Book) => void
  onClose: () => void
}

const colors = ['tomato', 'steelblue', 'seagreen', 'darkorchid', 'goldenrod', 'slategray']

function ReviewSheet({ onSave, onClose }: ReviewSheetProps) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(3)
  const [liked, setLiked] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [spoiler, setSpoiler] = useState(false)
  const [pickedColor, setPickedColor] = useState<string>()

  const typedTitle = title.trim().toLowerCase()
  const typedAuthor = author.trim().toLowerCase()

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

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || !author.trim()) return

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

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <form
        className="panel sheet form"
        aria-label="Write a review"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="panel-head">
          <h2>Write a review</h2>
          <button
            type="button"
            className="sheet-close"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <SuggestInput
          label="Title"
          value={title}
          required
          onChange={(value) => {
            setTitle(value)
            setPickedColor(undefined)
          }}
          suggestions={titleSuggestions}
          onPick={pickBook}
        />
        <SuggestInput
          label="Author"
          value={author}
          required
          onChange={setAuthor}
          suggestions={authorSuggestions}
          onPick={setAuthor}
        />

        <label className="field">
          Rating
          <span className="rating-row">
            <Stars rating={rating} />
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </span>
        </label>

        <label className="field">
          What did you like?
          <textarea
            rows={3}
            value={liked}
            onChange={(e) => setLiked(e.target.value)}
          />
        </label>

        <div className="field">
          Tags
          <TagPicker selected={tags} onToggle={toggleTag} />
        </div>

        <label className="check">
          <input
            type="checkbox"
            checked={spoiler}
            onChange={(e) => setSpoiler(e.target.checked)}
          />
          Contains spoilers
        </label>

        <button type="submit" className="button">
          Save review
        </button>
      </form>
    </div>
  )
}

export default ReviewSheet
