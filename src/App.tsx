import { Routes, Route } from 'react-router'
import BottomNav from './layout/BottomNav'
import NotFoundPage from './layout/NotFoundPage'
import ProfilePage from './users/ProfilePage'
import HomePage from './social/HomePage'
import SearchPage from './books/SearchPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <BottomNav />
    </>
  )
}

export default App
