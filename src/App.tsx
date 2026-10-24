import { Routes, Route } from 'react-router'
import BottomNav from './layout/BottomNav'
import NotFoundPage from './layout/NotFoundPage'
import ProfilePage from './users/ProfilePage'
import HomePage from './social/HomePage'
import SearchPage from './books/SearchPage'
import CreditsPage from './layout/CreditsPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <BottomNav />
    </>
  )
}

export default App
