import type { ReactNode } from 'react'

type EditRowProps = {
  label: string
  value: string
  tone?: 'error' | 'hint'
  trailing?: ReactNode
  onClick: () => void
}

function EditRow({ label, value, tone, trailing, onClick }: EditRowProps) {
  return (
    <button type="button" className="edit-row" onClick={onClick}>
      <span className="edit-row-text">
        <span className="edit-row-label">{label}</span>
        <span className={tone ? `edit-row-value ${tone}` : 'edit-row-value'}>
          {value}
        </span>
      </span>
      {trailing ?? (
        <span className="edit-row-chevron" aria-hidden="true">
          ›
        </span>
      )}
    </button>
  )
}

export default EditRow
