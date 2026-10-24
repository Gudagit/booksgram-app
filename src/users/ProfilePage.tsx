import { useState } from 'react'
import { Link } from 'react-router'
import BookTabs from '../books/BookTabs'
import FavoritesShelf from '../books/FavoritesShelf'
import { fakeFavorites, fakeShelves } from '../books/fakeBooks'
import EditProfileSheet from './EditProfileSheet'
import GenreTags from './GenreTags'
import ProfileHeader from './ProfileHeader'
import TastesPanel from './TastesPanel'
import { fakeFollowers } from './fakeProfile'
import { useProfile } from './useProfile'

const stats = [
  { label: 'Read', value: fakeShelves.read.length },
  {
    label: 'Reviews',
    value: fakeShelves.read.filter((book) => book.comment).length,
  },
  { label: 'Followers', value: fakeFollowers },
]

function ProfilePage() {
  const [profile, saveProfile] = useProfile()
  const [editing, setEditing] = useState(false)

  return (
    <main>
      <div className="side">
        <ProfileHeader
          profile={profile}
          stats={stats}
          onEdit={() => setEditing(true)}
        />
        <GenreTags genres={profile.genres} />
        <TastesPanel profile={profile} />
        <Link to="/credits" className="credits-link">
          Credits and licenses
        </Link>
      </div>
      <div className="content">
        <FavoritesShelf
          books={fakeFavorites.slice(0, 4)}
          candidates={[
            ...fakeShelves.read,
            ...fakeShelves.reading,
            ...fakeShelves.tbr,
          ]}
        />
        <BookTabs
          read={fakeShelves.read}
          reading={fakeShelves.reading}
          tbr={fakeShelves.tbr}
        />
      </div>
      {editing && (
        <EditProfileSheet
          profile={profile}
          onSave={saveProfile}
          onClose={() => setEditing(false)}
        />
      )}
    </main>
  )
}

export default ProfilePage
