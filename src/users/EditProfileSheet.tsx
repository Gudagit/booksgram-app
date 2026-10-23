import { useState } from 'react'
import ChipChoice from '../layout/ChipChoice'
import EditRow from '../layout/EditRow'
import EditSection from '../layout/EditSection'
import Sheet from '../layout/Sheet'
import {
  MAX_BIO,
  MAX_GENRES,
  audienceOptions,
  avatarColors,
  avoidOptions,
  banners,
  genreOptions,
  moodOptions,
  tropeOptions,
} from './profileOptions'
import type { Profile } from './types'
import './EditProfile.css'

type ListKey = 'genres' | 'audience' | 'tropes' | 'moods' | 'avoid'
type FieldKey = 'name' | 'handle' | 'bio' | 'avatar' | 'banner' | ListKey

type EditProfileSheetProps = {
  profile: Profile
  onSave: (profile: Profile) => void
  onClose: () => void
}

const sections: { title: string; fields: FieldKey[] }[] = [
  { title: 'About you', fields: ['name', 'handle', 'bio'] },
  { title: 'Look', fields: ['avatar', 'banner'] },
  {
    title: 'Reading taste',
    fields: ['genres', 'audience', 'tropes', 'moods', 'avoid'],
  },
]

const labels: Record<FieldKey, string> = {
  name: 'Display name',
  handle: 'Username',
  bio: 'Bio',
  avatar: 'Avatar color',
  banner: 'Banner',
  genres: 'Favorite genres',
  audience: 'Audience I read',
  tropes: 'Tropes and characters I love',
  moods: 'Moods I like',
  avoid: 'Content I avoid',
}

const listOptions: Record<Exclude<ListKey, 'genres'>, string[]> = {
  audience: audienceOptions,
  tropes: tropeOptions,
  moods: moodOptions,
  avoid: avoidOptions,
}

const HANDLE_PATTERN = /^[a-z0-9._]{3,20}$/

function validate(profile: Profile) {
  const errors: Partial<Record<FieldKey, string>> = {}
  if (!profile.name.trim()) errors.name = 'Name cannot be empty'
  if (!HANDLE_PATTERN.test(profile.handle)) {
    errors.handle = 'Use 3 to 20 letters, numbers, dots or underscores'
  }
  return errors
}

function listSummary(items: string[]) {
  if (items.length === 0) return 'Not set'
  const shown = items.slice(0, 3).join(', ')
  return items.length > 3 ? `${shown} +${items.length - 3}` : shown
}

function EditProfileSheet({ profile, onSave, onClose }: EditProfileSheetProps) {
  const [draft, setDraft] = useState<Profile>(profile)
  const [field, setField] = useState<FieldKey | null>(null)
  const [custom, setCustom] = useState('')

  const errors = validate(draft)
  const hasErrors = Object.keys(errors).length > 0
  const avatar = avatarColors.find((item) => item.id === draft.avatarId)
  const banner = banners.find((item) => item.id === draft.bannerId)

  function toggle(key: ListKey, option: string) {
    setDraft((current) => ({
      ...current,
      [key]: current[key].includes(option)
        ? current[key].filter((item) => item !== option)
        : [...current[key], option],
    }))
  }

  function addCustomGenre() {
    const name = custom.trim()
    const exists = draft.genres.some(
      (genre) => genre.toLowerCase() === name.toLowerCase(),
    )
    if (!name || exists || draft.genres.length >= MAX_GENRES) return
    setDraft((current) => ({ ...current, genres: [...current.genres, name] }))
    setCustom('')
  }

  function summary(key: FieldKey) {
    if (key === 'name') return draft.name.trim() || 'Not set'
    if (key === 'handle') return `@${draft.handle}`
    if (key === 'bio') return draft.bio.trim() || 'Not set'
    if (key === 'avatar') return avatar?.label ?? 'Green'
    if (key === 'banner') return banner?.label ?? 'Meadow'
    return listSummary(draft[key])
  }

  function handleSave() {
    if (hasErrors) return
    onSave({ ...draft, name: draft.name.trim(), bio: draft.bio.trim() })
    onClose()
  }

  if (field === null) {
    return (
      <Sheet title="Edit profile" onClose={onClose}>
        {sections.map((section) => (
          <EditSection key={section.title} title={section.title}>
            {section.fields.map((key) => (
              <EditRow
                key={key}
                label={labels[key]}
                value={errors[key] ?? summary(key)}
                tone={errors[key] ? 'error' : undefined}
                onClick={() => setField(key)}
              />
            ))}
          </EditSection>
        ))}

        <div className="sheet-actions">
          <button
            type="button"
            className="button"
            disabled={hasErrors}
            onClick={handleSave}
          >
            Save profile
          </button>
          <button type="button" className="button ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </Sheet>
    )
  }

  return (
    <Sheet title={labels[field]} onClose={onClose} onBack={() => setField(null)}>
      {field === 'name' && (
        <div className="field">
          <label htmlFor="edit-name">Name shown on your profile</label>
          <input
            id="edit-name"
            value={draft.name}
            maxLength={40}
            autoFocus
            onChange={(event) =>
              setDraft({ ...draft, name: event.target.value })
            }
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>
      )}

      {field === 'handle' && (
        <div className="field">
          <label htmlFor="edit-handle">Your @username</label>
          <input
            id="edit-handle"
            value={draft.handle}
            maxLength={20}
            autoFocus
            autoCapitalize="none"
            autoComplete="off"
            onChange={(event) =>
              setDraft({
                ...draft,
                handle: event.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9._]/g, ''),
              })
            }
          />
          <p className="muted">Letters, numbers, dots and underscores.</p>
          {errors.handle && <p className="field-error">{errors.handle}</p>}
        </div>
      )}

      {field === 'bio' && (
        <div className="field">
          <label htmlFor="edit-bio">A line about your reading</label>
          <textarea
            id="edit-bio"
            rows={4}
            value={draft.bio}
            maxLength={MAX_BIO}
            autoFocus
            onChange={(event) => setDraft({ ...draft, bio: event.target.value })}
          />
          <p className="muted char-count">
            {draft.bio.length} / {MAX_BIO}
          </p>
        </div>
      )}

      {field === 'avatar' && (
        <>
          <div
            className="avatar edit-avatar"
            style={{ background: avatar?.css }}
          >
            {draft.name.trim()[0] ?? '?'}
          </div>
          <div className="swatch-grid">
            {avatarColors.map((item) => (
              <button
                key={item.id}
                type="button"
                className="swatch"
                style={{ background: item.css }}
                aria-label={item.label}
                aria-pressed={draft.avatarId === item.id}
                onClick={() => setDraft({ ...draft, avatarId: item.id })}
              />
            ))}
          </div>
        </>
      )}

      {field === 'banner' && (
        <div className="banner-list">
          {banners.map((item) => (
            <button
              key={item.id}
              type="button"
              className="banner-option"
              aria-pressed={draft.bannerId === item.id}
              onClick={() => setDraft({ ...draft, bannerId: item.id })}
            >
              <span className="banner-strip" style={{ background: item.css }} />
              {item.label}
            </button>
          ))}
        </div>
      )}

      {field === 'genres' && (
        <>
          <p className="muted">
            {draft.genres.length} of {MAX_GENRES} chosen
          </p>
          <ChipChoice
            options={[
              ...genreOptions,
              ...draft.genres.filter((genre) => !genreOptions.includes(genre)),
            ]}
            selected={draft.genres}
            max={MAX_GENRES}
            onToggle={(option) => toggle('genres', option)}
          />
          <div className="field">
            <label htmlFor="custom-genre">Add your own</label>
            <div className="add-row">
              <input
                id="custom-genre"
                value={custom}
                maxLength={30}
                autoComplete="off"
                onChange={(event) => setCustom(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addCustomGenre()
                  }
                }}
              />
              <button
                type="button"
                className="button"
                disabled={draft.genres.length >= MAX_GENRES}
                onClick={addCustomGenre}
              >
                Add
              </button>
            </div>
          </div>
        </>
      )}

      {field !== 'genres' && field in listOptions && (
        <ChipChoice
          options={listOptions[field as Exclude<ListKey, 'genres'>]}
          selected={draft[field as ListKey]}
          onToggle={(option) => toggle(field as ListKey, option)}
        />
      )}

      <div className="sheet-actions">
        <button type="button" className="button" onClick={() => setField(null)}>
          Done
        </button>
      </div>
    </Sheet>
  )
}

export default EditProfileSheet
