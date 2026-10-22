export type Book = {
  id: string
  title: string
  author: string
  color: string
  rating?: number
  comment?: string
  tags?: string[]
  spoiler?: boolean
  seriesId?: string
}

export type SeriesEntry = {
  id: string
  order: number
  title: string
  author: string
  color: string
  status: 'read' | 'current' | 'next' | 'upcoming'
  rating?: number
  comment?: string
  releaseDate?: string
}

export type Series = {
  id: string
  name: string
  entries: SeriesEntry[]
}
