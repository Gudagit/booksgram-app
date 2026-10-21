import type { Book } from './types'

export const fakeShelves: Record<'read' | 'reading' | 'tbr', Book[]> = {
  read: [
    {
      id: '1',
      title: 'Dune',
      author: 'Frank Herbert',
      color: 'tomato',
      rating: 5,
      comment: 'A huge world that pulls you in. Slow start, worth every page.',
    },
    {
      id: '2',
      title: 'Emma',
      author: 'Jane Austen',
      color: 'steelblue',
      rating: 4,
      comment: 'Sharp, funny and full of people you want to shake.',
    },
    {
      id: '3',
      title: 'Beloved',
      author: 'Toni Morrison',
      color: 'seagreen',
      rating: 5,
      comment: 'Heavy and beautiful. I needed a few days after it.',
    },
  ],
  reading: [
    { id: '4', title: 'Circe', author: 'Madeline Miller', color: 'darkorchid' },
  ],
  tbr: [
    { id: '5', title: 'Hamnet', author: "Maggie O'Farrell", color: 'goldenrod' },
    { id: '6', title: 'Piranesi', author: 'Susanna Clarke', color: 'slategray' },
  ],
}

export const fakeFavorites: Book[] = [
  { id: 'f1', title: 'Dune', author: 'Frank Herbert', color: 'tomato' },
  { id: 'f2', title: 'Emma', author: 'Jane Austen', color: 'steelblue' },
  { id: 'f3', title: 'Beloved', author: 'Toni Morrison', color: 'seagreen' },
  { id: 'f4', title: 'Circe', author: 'Madeline Miller', color: 'darkorchid' },
  { id: 'f5', title: 'Hamnet', author: "Maggie O'Farrell", color: 'goldenrod' },
  { id: 'f6', title: 'Piranesi', author: 'Susanna Clarke', color: 'slategray' },
  { id: 'f7', title: 'Rebecca', author: 'Daphne du Maurier', color: 'indianred' },
]
