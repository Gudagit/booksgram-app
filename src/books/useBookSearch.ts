import { useEffect, useState } from 'react'
import { getKnownBooks } from './knownBooks'
import type { KnownBook } from './knownBooks'
import { searchOpenLibrary, sameBookKey } from './openLibrarySearch'

// Real titles and authors come from Wikidata (structured data is CC0, public
// domain). We only read the title and the author name; no descriptions, no covers.
const API = 'https://www.wikidata.org/w/api.php'
const MIN_LETTERS = 2
const WAIT_MS = 400
const OPEN_LIBRARY_WAIT_MS = 1000
const MAX_WRITERS = 3

// "instance of" values that mean a book: book, literary work, novel, written work, novella
const BOOK_CLASSES = new Set(['Q571', 'Q7725634', 'Q8261', 'Q47461344', 'Q149537'])
const COVER_COLORS = ['#7a2e2e', '#2f4a63', '#35553f', '#4a3a5c', '#8a6a2a', '#4d5560']

type Entity = {
  id: string
  labels?: Record<string, { value: string }>
  claims?: Record<string, { mainsnak?: { datavalue?: { value?: { id?: string } } } }[]>
}

async function call(params: Record<string, string>, signal: AbortSignal) {
  const query = new URLSearchParams({ ...params, format: 'json', origin: '*' })
  const response = await fetch(`${API}?${query}`, { signal })
  if (!response.ok) throw new Error(`Wikidata answered ${response.status}`)
  return response.json()
}

function claimIds(entity: Entity, property: string): string[] {
  return (entity.claims?.[property] ?? [])
    .map((claim) => claim.mainsnak?.datavalue?.value?.id)
    .filter((id): id is string => typeof id === 'string')
}

function bookKey(book: Pick<KnownBook, 'title' | 'author'>) {
  return `${book.title}|${book.author}`.toLowerCase()
}

async function searchBooks(text: string, signal: AbortSignal): Promise<KnownBook[]> {
  const found = await call(
    {
      action: 'wbsearchentities',
      search: text,
      language: 'en',
      uselang: 'en',
      type: 'item',
      limit: '50',
    },
    signal,
  )
  const foundIds: string[] = (found.search ?? []).map((item: { id: string }) => item.id)
  if (foundIds.length === 0) return []

  const details = await call(
    { action: 'wbgetentities', ids: foundIds.join('|'), props: 'labels|claims', languages: 'en' },
    signal,
  )
  const entities: Record<string, Entity> = details.entities ?? {}

  // a person among the matches (instance of human): also list the books they wrote
  const writers = foundIds
    .map((id) => entities[id])
    .filter((entity) => entity && claimIds(entity, 'P31').includes('Q5'))
    .slice(0, MAX_WRITERS)
  const writtenLists = await Promise.all(
    writers.map((writer) =>
      call(
        {
          action: 'query',
          list: 'search',
          srsearch: `haswbstatement:P50=${writer.id}`,
          srlimit: '20',
          srnamespace: '0',
        },
        signal,
      ),
    ),
  )
  const writtenIds: string[] = writtenLists.flatMap((list) =>
    (list.query?.search ?? []).map((item: { title: string }) => item.title),
  )
  const newIds = [...new Set(writtenIds)].filter((id) => !entities[id])
  if (newIds.length > 0) {
    const more = await call(
      { action: 'wbgetentities', ids: newIds.join('|'), props: 'labels|claims', languages: 'en' },
      signal,
    )
    Object.assign(entities, more.entities ?? {})
  }

  const bookEntities = [...new Set([...foundIds, ...writtenIds])]
    .map((id) => entities[id])
    .filter((entity) => entity && claimIds(entity, 'P31').some((id) => BOOK_CLASSES.has(id)))
  if (bookEntities.length === 0) return []

  const authorIds = [...new Set(bookEntities.flatMap((entity) => claimIds(entity, 'P50')))].slice(0, 50)
  const authorNames: Record<string, string> = {}
  if (authorIds.length > 0) {
    const authors = await call(
      { action: 'wbgetentities', ids: authorIds.join('|'), props: 'labels', languages: 'en' },
      signal,
    )
    for (const [id, entity] of Object.entries<Entity>(authors.entities ?? {})) {
      const name = entity.labels?.en?.value
      if (name) authorNames[id] = name
    }
  }

  // reader notes written inside the app belong to the same book, so we attach them
  const readerNotes = new Map(getKnownBooks().map((book) => [bookKey(book), book]))

  const seen = new Set<string>()
  const results: KnownBook[] = []
  bookEntities.forEach((entity, index) => {
    const title = entity.labels?.en?.value
    const names = claimIds(entity, 'P50').flatMap((id) => authorNames[id] ?? [])
    // an exact title and author are the point: no author, no result
    if (!title || names.length === 0) return
    const author = names.join(', ')
    const key = bookKey({ title, author })
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

type Settled = { text: string; results: KnownBook[]; failed: boolean }

// runs one search source after a pause in typing and keeps its latest answer
function useSource(
  text: string,
  active: boolean,
  waitMs: number,
  search: (text: string, signal: AbortSignal) => Promise<KnownBook[]>,
) {
  const [settled, setSettled] = useState<Settled | null>(null)

  useEffect(() => {
    if (!active) return
    const controller = new AbortController()
    const timer = setTimeout(() => {
      search(text, controller.signal)
        .then((results) => setSettled({ text, results, failed: false }))
        .catch(() => {
          if (controller.signal.aborted) return
          setSettled({ text, results: [], failed: true })
        })
    }, waitMs)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [text, active, waitMs, search])

  // `current` answers exactly what is typed now; `latest` is the last answer
  // we got, even if the text has changed since (used for suggestions)
  return { current: active && settled?.text === text ? settled : null, latest: settled }
}

// books from several sources as one list, the same book only once
function mergeBooks(...lists: KnownBook[][]) {
  const seen = new Set<string>()
  const merged: KnownBook[] = []
  for (const book of lists.flat()) {
    const key = sameBookKey(book.title, book.author)
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(book)
  }
  return merged
}

export function useBookSearch(query: string) {
  const text = query.trim()
  const active = text.length >= MIN_LETTERS

  // Wikidata answers fast; Open Library has newer books but is slow, so it waits longer
  const wikidataSource = useSource(text, active, WAIT_MS, searchBooks)
  const openLibrarySource = useSource(text, active, OPEN_LIBRARY_WAIT_MS, searchOpenLibrary)
  const wikidata = wikidataSource.current
  const openLibrary = openLibrarySource.current

  // Wikidata first, then Open Library books we do not have yet
  const results = mergeBooks(wikidata?.results ?? [], openLibrary?.results ?? [])
  // every book we have seen lately, for the grey "keep typing" suggestion
  const pool = mergeBooks(
    wikidataSource.latest?.results ?? [],
    openLibrarySource.latest?.results ?? [],
  )

  return {
    pool,
    tooShort: text !== '' && !active,
    loading: active && wikidata === null && openLibrary === null,
    loadingMore: active && openLibrary === null,
    failed: wikidata?.failed === true && openLibrary?.failed === true,
    results,
  }
}
