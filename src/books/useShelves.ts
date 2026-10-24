import { useState } from 'react'
import { fakeShelves } from './fakeBooks'
import type { Book } from './types'

export type ShelfKey = 'read' | 'reading' | 'tbr'
export type Shelves = Record<ShelfKey, Book[]>

export const shelfLabels: Record<ShelfKey, string> = {
  read: 'Read',
  reading: 'Reading',
  tbr: 'To read',
}

const STORAGE_KEY = 'booksgram.shelves.v1'
const shelfKeys: ShelfKey[] = ['read', 'reading', 'tbr']

function isBook(value: unknown): value is Book {
  if (typeof value !== 'object' || value === null) return false
  const book = value as Record<string, unknown>
  return (
    typeof book.id === 'string' &&
    typeof book.title === 'string' &&
    typeof book.author === 'string' &&
    typeof book.color === 'string'
  )
}

function load(): Shelves {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fakeShelves
    const saved = JSON.parse(raw) as Record<string, unknown>
    const list = (key: ShelfKey) => {
      const value = saved[key]
      return Array.isArray(value) && value.every(isBook) ? value : fakeShelves[key]
    }
    return { read: list('read'), reading: list('reading'), tbr: list('tbr') }
  } catch {
    return fakeShelves
  }
}

function sameBook(a: Pick<Book, 'title' | 'author'>, b: Pick<Book, 'title' | 'author'>) {
  return (
    a.title.trim().toLowerCase() === b.title.trim().toLowerCase() &&
    a.author.trim().toLowerCase() === b.author.trim().toLowerCase()
  )
}

export function useShelves() {
  const [shelves, setShelves] = useState<Shelves>(load)

  function shelfOf(book: Pick<Book, 'title' | 'author'>) {
    return shelfKeys.find((key) => shelves[key].some((item) => sameBook(item, book)))
  }

  function without(book: Pick<Book, 'title' | 'author'>): Shelves {
    return {
      read: shelves.read.filter((item) => !sameBook(item, book)),
      reading: shelves.reading.filter((item) => !sameBook(item, book)),
      tbr: shelves.tbr.filter((item) => !sameBook(item, book)),
    }
  }

  function save(next: Shelves) {
    setShelves(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // storage unavailable (private window): the shelves still update on screen
    }
  }

  function addBook(shelf: ShelfKey, book: Book) {
    const next = without(book)
    next[shelf] = [book, ...next[shelf]]
    save(next)
  }

  function removeBook(book: Pick<Book, 'title' | 'author'>) {
    save(without(book))
  }

  return { shelves, addBook, removeBook, shelfOf }
}
