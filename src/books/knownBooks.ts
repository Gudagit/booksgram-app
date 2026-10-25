import { fakePosts } from '../social/fakePosts'
import { fakeFavorites, fakeSeries, fakeShelves } from './fakeBooks'
import type { Book } from './types'

// A note written by a reader about a book. Never copied from another site.
export type Opinion = { by: string; text: string; rating?: number }

export type KnownBook = Pick<Book, 'title' | 'author' | 'color'> & {
  tags: string[]
  opinions: Opinion[]
}

type Source = {
  by: string
  book: Pick<Book, 'title' | 'author' | 'color' | 'tags' | 'comment' | 'rating'>
}

function keyOf(book: Pick<Book, 'title' | 'author'>) {
  return `${book.title}|${book.author}`.toLowerCase()
}

export function getKnownBooks(): KnownBook[] {
  const sources: Source[] = [
    ...fakePosts.map((post) => ({ by: `@${post.user.handle}`, book: post.book })),
    ...[
      ...fakeShelves.read,
      ...fakeShelves.reading,
      ...fakeShelves.tbr,
      ...fakeFavorites,
      ...Object.values(fakeSeries).flatMap((series) => series.entries),
    ].map((book) => ({ by: 'a reader', book })),
  ]

  const byKey = new Map<string, KnownBook>()
  for (const { by, book } of sources) {
    const key = keyOf(book)
    let known = byKey.get(key)
    if (!known) {
      known = {
        title: book.title,
        author: book.author,
        color: book.color,
        tags: [],
        opinions: [],
      }
      byKey.set(key, known)
    }
    for (const tag of book.tags ?? []) {
      if (!known.tags.includes(tag)) known.tags.push(tag)
    }
    const text = book.comment?.trim()
    if (text && !known.opinions.some((item) => item.text === text)) {
      known.opinions.push({ by, text, rating: book.rating })
    }
  }
  return [...byKey.values()]
}
