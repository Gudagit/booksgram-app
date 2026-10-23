import { useState } from 'react'
import { fakePosts } from './fakePosts'
import PostCard from './PostCard'
import ReelsRow from './ReelsRow'
import type { FeedKey } from './types'
import './feed.css'

const tabs: { key: FeedKey; label: string }[] = [
  { key: 'following', label: 'Following' },
  { key: 'foryou', label: 'For You' },
]

function HomePage() {
  const [active, setActive] = useState<FeedKey>('following')
  const posts = fakePosts.filter((post) => post.feed === active)

  return (
    <main className="feed">
      <h1 className="sr-only">Home</h1>
      <ReelsRow />
      <div className="tabs tabs-two" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active === tab.key}
            className={active === tab.key ? 'tab active' : 'tab'}
            onClick={() => setActive(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  )
}

export default HomePage
