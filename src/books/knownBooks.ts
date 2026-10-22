import { fakeFavorites, fakeSeries, fakeShelves } from './fakeBooks'
import type { Book } from './types'

export type KnownBook = Pick<Book, 'title' | 'author' | 'color'>

export function getKnownBooks(): KnownBook[] {
  const all: KnownBook[] = [
    ...fakeShelves.read,
    ...fakeShelves.reading,
    ...fakeShelves.tbr,
    ...fakeFavorites,
    ...Object.values(fakeSeries).flatMap((series) => series.entries),
  ]

  const seen = new Set<string>()
  return all.filter((book) => {
    const key = `${book.title}|${book.author}`.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}
