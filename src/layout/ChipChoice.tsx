type ChipChoiceProps = {
  options: string[]
  selected: string[]
  onToggle: (option: string) => void
  max?: number
}

function ChipChoice({ options, selected, onToggle, max }: ChipChoiceProps) {
  const full = max !== undefined && selected.length >= max

  return (
    <div className="chips">
      {options.map((option) => {
        const on = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            className="chip chip-toggle"
            aria-pressed={on}
            disabled={full && !on}
            onClick={() => onToggle(option)}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default ChipChoice
