import BookTabs from '../books/BookTabs'
import FavoritesShelf from '../books/FavoritesShelf'
import { fakeFavorites, fakeShelves } from '../books/fakeBooks'
import GenreTags from './GenreTags'
import ProfileHeader from './ProfileHeader'
import { fakeProfile } from './fakeProfile'

const stats = [
  { label: 'Read', value: fakeShelves.read.length },
  {
    label: 'Reviews',
    value: fakeShelves.read.filter((book) => book.comment).length,
  },
  { label: 'Followers', value: fakeProfile.followers },
]

function ProfilePage() {
  return (
    <main>
      <div className="side">
        <ProfileHeader
          name={fakeProfile.name}
          handle={fakeProfile.handle}
          bio={fakeProfile.bio}
          stats={stats}
        />
        <GenreTags genres={fakeProfile.genres} />
      </div>
      <div className="content">
        <FavoritesShelf books={fakeFavorites} />
        <BookTabs
          read={fakeShelves.read}
          reading={fakeShelves.reading}
          tbr={fakeShelves.tbr}
        />
      </div>
    </main>
  )
}

export default ProfilePage
