import { useId, useState } from 'react'

export type Suggestion = {
  key: string
  label: string
  sub?: string
}

type SuggestInputProps = {
  label: string
  value: string
  onChange: (value: string) => void
  suggestions: Suggestion[]
  onPick: (key: string) => void
  required?: boolean
}

function SuggestInput({
  label,
  value,
  onChange,
  suggestions,
  onPick,
  required,
}: SuggestInputProps) {
  const id = useId()
  const [open, setOpen] = useState(false)

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="suggest">
        <input
          id={id}
          value={value}
          required={required}
          autoComplete="off"
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
        {open && suggestions.length > 0 && (
          <ul className="suggest-list" role="listbox">
            {suggestions.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault()
                    onPick(item.key)
                    setOpen(false)
                  }}
                >
                  {item.label}
                  {item.sub && <span className="suggest-sub">{item.sub}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SuggestInput
