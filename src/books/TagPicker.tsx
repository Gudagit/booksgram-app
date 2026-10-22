import { tagGroups } from './bookTags'

type TagPickerProps = {
  selected: string[]
  onToggle: (tag: string) => void
}

function TagPicker({ selected, onToggle }: TagPickerProps) {
  return (
    <div className="tag-picker">
      {tagGroups.map((group) => (
        <fieldset key={group.name} className="tag-group">
          <legend>{group.name}</legend>
          <div className="chips">
            {group.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="chip chip-toggle"
                aria-pressed={selected.includes(tag)}
                onClick={() => onToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  )
}

export default TagPicker
