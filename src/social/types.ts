import type { Book } from '../books/types'

export type FeedKey = 'following' | 'foryou'

export type Post = {
  id: string
  feed: FeedKey
  user: { name: string; handle: string; color: string }
  action: string
  time: string
  book: Book
  likes: number
  comments: number
}

export type Reel = {
  id: string
  title: string
  caption: string
  scene: 'hills' | 'sea' | 'night' | 'forest'
  handle: string
  color: string
}
