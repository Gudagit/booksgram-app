import { useState } from 'react'
import { fakeReels } from './fakePosts'
import ReelArt from './ReelArt'

type Turn = 'next' | 'prev'
type Side = 'left' | 'right'

const total = fakeReels.length

type ReelPageProps = {
  index: number
  side: Side
}

function ReelPage({ index, side }: ReelPageProps) {
  const reel = fakeReels[index]

  if (!reel) return <div className={`page page-${side}`} />

  return (
    <div className={`page page-${side}`}>
      <div className="page-art">
        <div className={`art-half art-${side}`}>
          <ReelArt reel={reel} />
        </div>
      </div>
      <div className="page-text">
        {side === 'left' ? (
          <>
            <p className="page-heading">{reel.title}</p>
            <p className="page-handle">@{reel.handle}</p>
          </>
        ) : (
          <p className="page-caption">{reel.caption}</p>
        )}
      </div>
      <span className="page-number">{index * 2 + (side === 'left' ? 1 : 2)}</span>
    </div>
  )
}

function ReelsRow() {
  const [spread, setSpread] = useState(0)
  const [turning, setTurning] = useState<Turn | null>(null)

  const leftIndex = turning === 'prev' ? spread - 1 : spread
  const rightIndex = turning === 'next' ? spread + 1 : spread

  function startTurn(direction: Turn) {
    if (turning) return
    if (direction === 'next' && spread >= total - 1) return
    if (direction === 'prev' && spread <= 0) return
    setTurning(direction)
  }

  function finishTurn() {
    setSpread(spread + (turning === 'next' ? 1 : -1))
    setTurning(null)
  }

  function jumpTo(index: number) {
    if (!turning) setSpread(index)
  }

  return (
    <section className="reel-book">
      <div className="panel-head">
        <h2>Reels</h2>
        <span className="muted">Preview, video coming later</span>
      </div>

      <div className="book">
        <div className="book-pages">
          <ReelPage index={leftIndex} side="left" />
          <ReelPage index={rightIndex} side="right" />
          {turning && (
            <div
              className={`leaf leaf-${turning}`}
              aria-hidden="true"
              onAnimationEnd={finishTurn}
            >
              <div className="leaf-face">
                <ReelPage
                  index={spread}
                  side={turning === 'next' ? 'right' : 'left'}
                />
              </div>
              <div className="leaf-face leaf-back">
                <ReelPage
                  index={turning === 'next' ? spread + 1 : spread - 1}
                  side={turning === 'next' ? 'left' : 'right'}
                />
              </div>
            </div>
          )}
          <button
            type="button"
            className="page-hit page-hit-left"
            aria-label="Previous reel"
            disabled={spread === 0}
            onClick={() => startTurn('prev')}
          />
          <button
            type="button"
            className="page-hit page-hit-right"
            aria-label="Next reel"
            disabled={spread === total - 1}
            onClick={() => startTurn('next')}
          />
        </div>
      </div>

      <div className="book-nav">
        <button
          type="button"
          className="book-arrow"
          aria-label="Previous reel"
          disabled={spread === 0}
          onClick={() => startTurn('prev')}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <span className="muted">
          Reel {spread + 1} of {total}
        </span>
        <button
          type="button"
          className="book-arrow"
          aria-label="Next reel"
          disabled={spread === total - 1}
          onClick={() => startTurn('next')}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="reel-thumbs">
        {fakeReels.map((reel, i) => (
          <button
            key={reel.id}
            type="button"
            className={i === spread ? 'reel-thumb on' : 'reel-thumb'}
            style={{ backgroundColor: reel.color }}
            aria-label={`Open reel ${i + 1}: ${reel.title}`}
            onClick={() => jumpTo(i)}
          />
        ))}
      </div>
    </section>
  )
}

export default ReelsRow
