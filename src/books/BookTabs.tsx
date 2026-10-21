import { useState } from 'react'
import BookShelf from './BookShelf'
import ReadList from './ReadList'
import type { Book } from './types'

type TabKey = 'read' | 'reading' | 'tbr'

type BookTabsProps = {
  read: Book[]
  reading: Book[]
  tbr: Book[]
}

const tabs: { key: TabKey; label: string }[] = [
  { key: 'read', label: 'Read' },
  { key: 'reading', label: 'Reading' },
  { key: 'tbr', label: 'To read' },
]

function BookTabs({ read, reading, tbr }: BookTabsProps) {
  const [active, setActive] = useState<TabKey>('read')
  const lists = { read, reading, tbr }

  return (
    <section className="panel">
      <div className="tabs" role="tablist">
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
            <span className="tab-count">{lists[tab.key].length}</span>
          </button>
        ))}
      </div>
      {active === 'read' ? (
        <ReadList books={lists.read} />
      ) : (
        <BookShelf books={lists[active]} />
      )}
    </section>
  )
}

export default BookTabs
