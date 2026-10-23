import { avatarColors, banners } from './profileOptions'
import type { Profile } from './types'

type Stat = {
  label: string
  value: number
}

type ProfileHeaderProps = {
  profile: Profile
  stats: Stat[]
  onEdit: () => void
}

function ProfileHeader({ profile, stats, onEdit }: ProfileHeaderProps) {
  const avatar = avatarColors.find((item) => item.id === profile.avatarId)
  const banner = banners.find((item) => item.id === profile.bannerId)

  return (
    <header className="panel hero">
      <div className="hero-banner" style={{ background: banner?.css }} />
      <div className="hero-body">
        <div className="avatar" style={{ background: avatar?.css }}>
          {profile.name[0]}
        </div>
        <h1>{profile.name}</h1>
        <p className="handle">@{profile.handle}</p>
        {profile.bio && <p className="bio">{profile.bio}</p>}
        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
        <button type="button" className="button" onClick={onEdit}>
          Edit profile
        </button>
      </div>
    </header>
  )
}

export default ProfileHeader
