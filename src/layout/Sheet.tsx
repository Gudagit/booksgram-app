import { useEffect } from 'react'
import type { FormEvent, ReactNode } from 'react'
import './Sheet.css'

type SheetProps = {
  title: string
  onClose: () => void
  children: ReactNode
  onSubmit?: (event: FormEvent) => void
  onBack?: () => void
}

function Sheet({ title, onClose, onSubmit, onBack, children }: SheetProps) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const header = (
    <div className="sheet-head">
      {onBack && (
        <button
          type="button"
          className="sheet-back"
          aria-label="Back"
          onClick={onBack}
        >
          ‹
        </button>
      )}
      <h2>{title}</h2>
      <button
        type="button"
        className="sheet-close"
        aria-label="Close"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  )

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet-shadow" onClick={(event) => event.stopPropagation()}>
        {onSubmit ? (
          <form className="sheet form" aria-label={title} onSubmit={onSubmit}>
            {header}
            {children}
          </form>
        ) : (
          <section className="sheet" role="dialog" aria-label={title}>
            {header}
            {children}
          </section>
        )}
      </div>
    </div>
  )
}

export default Sheet
