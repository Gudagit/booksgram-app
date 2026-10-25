import { tagGroups } from '../books/bookTags'

export const MAX_GENRES = 8
export const MAX_BIO = 160

export const avatarColors = [
  { id: 'green', label: 'Green', css: 'linear-gradient(135deg, #34c38a, #0f8a57)' },
  { id: 'orange', label: 'Orange', css: 'linear-gradient(135deg, #f59e57, #d9662b)' },
  { id: 'blue', label: 'Blue', css: 'linear-gradient(135deg, #5aa2e0, #2d6a8f)' },
  { id: 'purple', label: 'Purple', css: 'linear-gradient(135deg, #a98bdc, #6a4a9f)' },
  { id: 'rose', label: 'Rose', css: 'linear-gradient(135deg, #ef8fb0, #c0405f)' },
  { id: 'gold', label: 'Gold', css: 'linear-gradient(135deg, #dcc08a, #b99556)' },
  { id: 'slate', label: 'Slate', css: 'linear-gradient(135deg, #8a9aa8, #4f5f6b)' },
]

export const banners = [
  { id: 'meadow', label: 'Meadow', css: 'linear-gradient(120deg, #9be3bf, #b9d9ff 55%, #ffd2bd)' },
  { id: 'dusk', label: 'Dusk', css: 'linear-gradient(120deg, #b7a6f0, #f4b6c8 55%, #ffd9a8)' },
  { id: 'sea', label: 'Sea', css: 'linear-gradient(120deg, #8fd3e8, #7fb0f0 55%, #c3b8f5)' },
  { id: 'forest', label: 'Forest', css: 'linear-gradient(120deg, #7cc59a, #4f9a78 55%, #b6d98a)' },
  { id: 'ember', label: 'Ember', css: 'linear-gradient(120deg, #ffb27a, #f27c6b 55%, #e8a0c0)' },
  { id: 'parchment', label: 'Parchment', css: 'linear-gradient(120deg, #ecd9a8, #d9b878 55%, #f1e3bf)' },
]

const extraGenres = [
  'Crime',
  'Adventure',
  'Cozy mystery',
  'Poetry',
  'Graphic novels',
  'Manga',
  'Short stories',
  'Biography',
  'Psychology',
  'Philosophy',
  'Self-help',
]

function tagsOf(name: string) {
  return tagGroups.find((group) => group.name === name)?.tags ?? []
}

export const genreOptions = [...new Set([...tagsOf('Genre'), ...extraGenres])]
export const audienceOptions = tagsOf('Audience')
export const tropeOptions = tagsOf('Tropes and characters')
export const moodOptions = tagsOf('Mood')
export const avoidOptions = tagsOf('Content notes')
