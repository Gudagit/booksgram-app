import type { Profile } from './types'

export const fakeFollowers = 128

export const defaultProfile: Profile = {
  name: 'Ivana',
  handle: 'ivana',
  bio: 'Fantasy, classics and anything with a good ending.',
  avatarId: 'green',
  bannerId: 'meadow',
  genres: [
    'Fantasy',
    'Historical fiction',
    'Science fiction',
    'Classic',
    'Literary fiction',
  ],
  audience: [],
  tropes: [],
  moods: [],
  avoid: [],
}
