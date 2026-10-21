import BottomNav from './layout/BottomNav'
import ProfilePage from './users/ProfilePage'

function App() {
  return (
    <>
      <ProfilePage />
      <BottomNav active="profile" />
    </>
  )
}

export default App
