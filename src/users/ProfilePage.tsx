import BookShelf from '../books/BookShelf'
import { fakeShelves } from '../books/fakeBooks'

function ProfilePage() {
  return (
    <main>
      <h1>My profile</h1>
      <BookShelf title="Read" books={fakeShelves.read} />
      <BookShelf title="Currently reading" books={fakeShelves.reading} />
      <BookShelf title="Want to read" books={fakeShelves.tbr} />
    </main>
  )
}

export default ProfilePage
