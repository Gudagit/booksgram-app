import type { Profile } from './types'

type TastesPanelProps = {
  profile: Profile
}

const groups: { key: 'audience' | 'tropes' | 'moods' | 'avoid'; title: string }[] = [
  { key: 'audience', title: 'Reads' },
  { key: 'tropes', title: 'Loves' },
  { key: 'moods', title: 'In the mood for' },
  { key: 'avoid', title: 'Avoids' },
]

function TastesPanel({ profile }: TastesPanelProps) {
  const filled = groups.filter((group) => profile[group.key].length > 0)

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Reading taste</h2>
      </div>
      {filled.length === 0 ? (
        <p className="muted">
          Tell readers what you love: Edit profile, then Reading taste.
        </p>
      ) : (
        <div className="tastes">
          {filled.map((group) => (
            <div key={group.key} className="taste-group">
              <h3>{group.title}</h3>
              <div className="chips">
                {profile[group.key].map((item) => (
                  <span
                    key={item}
                    className={
                      group.key === 'avoid'
                        ? 'chip chip-small chip-avoid'
                        : 'chip chip-small'
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default TastesPanel
