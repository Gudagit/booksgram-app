import { useState } from 'react'
import BookShelf from './BookShelf'
import { fakeSeries } from './fakeBooks'
import ReadList from './ReadList'
import ReviewSheet from './ReviewSheet'
import SeriesSheet from './SeriesSheet'
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
  const [readBooks, setReadBooks] = useState(read)
  const [openSeries, setOpenSeries] = useState<string | null>(null)
  const [writing, setWriting] = useState(false)
  const lists = { read: readBooks, reading, tbr }

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
        <>
          <button
            type="button"
            className="button write-btn"
            onClick={() => setWriting(true)}
          >
            Write a review
          </button>
          <ReadList books={lists.read} />
        </>
      ) : (
        <BookShelf
          books={lists[active]}
          onSeries={(book) => setOpenSeries(book.seriesId ?? null)}
        />
      )}
      {openSeries && fakeSeries[openSeries] && (
        <SeriesSheet
          series={fakeSeries[openSeries]}
          onClose={() => setOpenSeries(null)}
        />
      )}
      {writing && (
        <ReviewSheet
          onSave={(book) => setReadBooks([book, ...readBooks])}
          onClose={() => setWriting(false)}
        />
      )}
    </section>
  )
}

export default BookTabs
