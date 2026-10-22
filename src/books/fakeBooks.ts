import type { Book, Series } from './types'

export const fakeShelves: Record<'read' | 'reading' | 'tbr', Book[]> = {
  read: [
    {
      id: '1',
      title: 'Dune',
      author: 'Frank Herbert',
      color: 'tomato',
      rating: 5,
      comment: 'A huge world that pulls you in. Slow start, worth every page.',
      tags: ['Science fiction', 'Adult', 'Slow-paced', 'Chosen one'],
    },
    {
      id: '2',
      title: 'Emma',
      author: 'Jane Austen',
      color: 'steelblue',
      rating: 3.5,
      comment: 'Sharp, funny and full of people you want to shake.',
    },
    {
      id: '3',
      title: 'Beloved',
      author: 'Toni Morrison',
      color: 'seagreen',
      rating: 5,
      comment: 'Heavy and beautiful. I needed a few days after it.',
      spoiler: true,
    },
  ],
  reading: [
    { id: '4', title: 'Circe', author: 'Madeline Miller', color: 'darkorchid' },
    {
      id: '7',
      title: 'Ashlight',
      author: 'Mira Vale',
      color: '#c0562f',
      seriesId: 'salt-road',
    },
  ],
  tbr: [
    { id: '5', title: 'Hamnet', author: "Maggie O'Farrell", color: 'goldenrod' },
    { id: '6', title: 'Piranesi', author: 'Susanna Clarke', color: 'slategray' },
  ],
}

export const fakeFavorites: Book[] = [
  {
    id: 'f1',
    title: 'Dune',
    author: 'Frank Herbert',
    color: 'tomato',
    rating: 5,
    comment: 'A huge world that pulls you in. Slow start, worth every page.',
    tags: ['Science fiction', 'Adult', 'Slow-paced', 'Chosen one'],
  },
  {
    id: 'f2',
    title: 'Emma',
    author: 'Jane Austen',
    color: 'steelblue',
    rating: 3.5,
    comment: 'Sharp, funny and full of people you want to shake.',
  },
  {
    id: 'f3',
    title: 'Beloved',
    author: 'Toni Morrison',
    color: 'seagreen',
    rating: 5,
    comment: 'Heavy and beautiful. I needed a few days after it.',
    spoiler: true,
  },
  {
    id: 'f4',
    title: 'Circe',
    author: 'Madeline Miller',
    color: 'darkorchid',
    rating: 4.5,
    comment: 'A myth retold so well you forget it is a myth.',
    tags: ['Fantasy', 'Mythology retelling', 'Adult', 'Slow burn', 'Atmospheric'],
  },
  {
    id: 'f5',
    title: 'Hamnet',
    author: "Maggie O'Farrell",
    color: 'goldenrod',
    rating: 4,
    comment: 'Quiet, grief-soaked and impossible to put down.',
  },
]

export const fakeSeries: Record<string, Series> = {
  'salt-road': {
    id: 'salt-road',
    name: 'The Salt Road',
    entries: [
      {
        id: 's1',
        order: 1,
        title: 'Tidewalker',
        author: 'Mira Vale',
        color: '#2b6f8f',
        status: 'read',
        rating: 4,
        comment: 'Slow burn, gorgeous setting.',
      },
      {
        id: 's2',
        order: 2,
        title: 'Ashlight',
        author: 'Mira Vale',
        color: '#c0562f',
        status: 'current',
      },
      {
        id: 's3',
        order: 3,
        title: 'Hollow Crown',
        author: 'Mira Vale',
        color: '#6b4aa0',
        status: 'next',
      },
      {
        id: 's4',
        order: 4,
        title: 'Last Harbor',
        author: 'Mira Vale',
        color: '#3f7d5a',
        status: 'upcoming',
        releaseDate: '2027-05-14',
      },
    ],
  },
}
