type Stat = {
  label: string
  value: number
}

type ProfileHeaderProps = {
  name: string
  handle: string
  bio: string
  stats: Stat[]
}

function ProfileHeader({ name, handle, bio, stats }: ProfileHeaderProps) {
  return (
    <header className="panel hero">
      <div className="hero-banner" />
      <div className="hero-body">
        <div className="avatar">{name[0]}</div>
        <h1>{name}</h1>
        <p className="handle">@{handle}</p>
        <p className="bio">{bio}</p>
        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
        <button type="button" className="button">
          Edit profile
        </button>
      </div>
    </header>
  )
}

export default ProfileHeader
