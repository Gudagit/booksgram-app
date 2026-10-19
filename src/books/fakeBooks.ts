import type { Book } from './types'

export const fakeShelves: Record<'read' | 'reading' | 'tbr', Book[]> = {
  read: [
    { id: '1', title: 'Dune', author: 'Frank Herbert', color: 'tomato' },
    { id: '2', title: 'Emma', author: 'Jane Austen', color: 'steelblue' },
    { id: '3', title: 'Beloved', author: 'Toni Morrison', color: 'seagreen' },
  ],
  reading: [
    { id: '4', title: 'Circe', author: 'Madeline Miller', color: 'darkorchid' },
  ],
  tbr: [
    { id: '5', title: 'Hamnet', author: "Maggie O'Farrell", color: 'goldenrod' },
    { id: '6', title: 'Piranesi', author: 'Susanna Clarke', color: 'slategray' },
  ],
}
