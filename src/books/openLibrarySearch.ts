import { getKnownBooks } from './knownBooks'
import type { KnownBook } from './knownBooks'

// Open Library covers newer books than Wikidata, but it answers slowly (seconds).
// We take only the title and the author name: no descriptions, no covers.
const API = 'https://openlibrary.org/search.json'
const LIMIT = '20'
const COVER_COLORS = ['#7a2e2e', '#2f4a63', '#35553f', '#4a3a5c', '#8a6a2a', '#4d5560']

// sets and bundles are not one book
const NOT_ONE_BOOK = /(box(ed)? set|collection|books? set|\bset of\b|bundle|omnibus|\b\d+\s*-\s*\d+\b)/i

// things Open Library lists as "books" that are not what a reader means
const NOT_A_READ =
  /(poster|colou?ring|planner|calendar|tarot|journal|notebook|sticker|annual|cinematic guide|out of print|\bpaperback\b|\bhardcover\b)/i

// "authors" that are really a publisher or a placeholder
const NOT_A_PERSON =
  /(out of print|unknown|various|anonymous|entertainment|creative team|publish|\bpress\b|\binc\b|\bltd\b|\bllc\b|books$|paperblanks)/i

type Doc = { title?: string; author_name?: string[] }

// reader notes written inside the app belong to the same book, so we attach them
const readerNotes = new Map(
  getKnownBooks().map((book) => [sameBookKey(book.title, book.author), book]),
)

// the same book written slightly differently gets the same key:
// "Fourth Wing (The Empyrean Book 1)" and "Fourth Wing" are one book
export function sameBookKey(title: string, author: string) {
  const clean = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
  return `${clean(title.split(/[:(]/)[0])}|${clean(author.split(',')[0])}`
}

export async function searchOpenLibrary(text: string, signal: AbortSignal): Promise<KnownBook[]> {
  const query = new URLSearchParams({ q: text, fields: 'title,author_name', limit: LIMIT })
  const response = await fetch(`${API}?${query}`, { signal })
  if (!response.ok) throw new Error(`Open Library answered ${response.status}`)
  const data: { docs?: Doc[] } = await response.json()

  const seen = new Set<string>()
  const results: KnownBook[] = []
  ;(data.docs ?? []).forEach((doc, index) => {
    const title = doc.title?.trim()
    const authors = (doc.author_name ?? []).slice(0, 2)
    // an exact title and author are the point: no author, no result
    if (!title || title.length > 120 || authors.length === 0) return
    if (NOT_ONE_BOOK.test(title) || NOT_A_READ.test(title)) return

    const author = authors.join(', ')
    if (NOT_A_PERSON.test(author)) return
    const key = sameBookKey(title, author)
    if (seen.has(key)) return
    seen.add(key)

    const notes = readerNotes.get(key)
    results.push({
      title,
      author,
      color: notes?.color ?? COVER_COLORS[(title.length + index) % COVER_COLORS.length],
      tags: notes?.tags ?? [],
      opinions: notes?.opinions ?? [],
    })
  })
  return results
}
