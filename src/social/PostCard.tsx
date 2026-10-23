import { useState } from 'react'
import ReviewBody from '../books/ReviewBody'
import Stars from '../books/Stars'
import type { Post } from './types'

type PostCardProps = {
  post: Post
}

function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const { user, book } = post

  return (
    <article className="panel post">
      <header className="post-head">
        <div className="post-avatar" style={{ backgroundColor: user.color }}>
          {user.name[0]}
        </div>
        <div>
          <p className="post-who">
            <strong>{user.name}</strong> {post.action}
          </p>
          <p className="muted">
            @{user.handle} · {post.time}
          </p>
        </div>
      </header>

      <div className="post-book">
        <div className="cover review-cover" style={{ backgroundColor: book.color }}>
          {book.title}
        </div>
        <div>
          <p className="review-title">{book.title}</p>
          <p className="review-author">{book.author}</p>
          {book.rating !== undefined && <Stars rating={book.rating} />}
        </div>
      </div>

      <ReviewBody book={book} />

      <div className="post-actions">
        <button
          type="button"
          className={liked ? 'post-action liked' : 'post-action'}
          aria-pressed={liked}
          onClick={() => setLiked(!liked)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
          </svg>
          {post.likes + (liked ? 1 : 0)}
        </button>
        <button type="button" className="post-action">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 5h16v11H9l-5 4z" />
          </svg>
          {post.comments}
        </button>
      </div>
    </article>
  )
}

export default PostCard
