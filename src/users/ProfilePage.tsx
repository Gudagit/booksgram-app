import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../auth/useAuth'
import BookTabs from '../books/BookTabs'
import FavoritesShelf from '../books/FavoritesShelf'
import { fakeFavorites } from '../books/fakeBooks'
import { useShelves } from '../books/useShelves'
import EditProfileSheet from './EditProfileSheet'
import GenreTags from './GenreTags'
import ProfileHeader from './ProfileHeader'
import TastesPanel from './TastesPanel'
import { fakeFollowers } from './fakeProfile'
import { useProfile } from './useProfile'

function ProfilePage() {
  const { user } = useAuth()
  const [profile, saveProfile] = useProfile()
  const { shelves, addBook, removeBook } = useShelves()
  const [editing, setEditing] = useState(false)

  const stats = [
    { label: 'Read', value: shelves.read.length },
    {
      label: 'Reviews',
      value: shelves.read.filter((book) => book.comment).length,
    },
    { label: 'Followers', value: fakeFollowers },
  ]

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
        <Link to="/login" className="credits-link">
          {user ? `Signed in as ${user.email}` : 'Sign in or create an account'}
        </Link>
        <Link to="/credits" className="credits-link">
          Credits and licenses
        </Link>
      </div>
      <div className="content">
        <FavoritesShelf
          books={fakeFavorites.slice(0, 4)}
          candidates={[...shelves.read, ...shelves.reading, ...shelves.tbr]}
        />
        <BookTabs
          read={shelves.read}
          reading={shelves.reading}
          tbr={shelves.tbr}
          onReview={(book) => addBook('read', book)}
          onRemove={removeBook}
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
