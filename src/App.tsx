import { Navigate, Routes, Route } from 'react-router'
import BottomNav from './layout/BottomNav'
import NotFoundPage from './layout/NotFoundPage'
import ProfilePage from './users/ProfilePage'
import HomePage from './social/HomePage'
import SearchPage from './books/SearchPage'
import CreditsPage from './layout/CreditsPage'
import AccountCorner from './auth/AccountCorner'
import AuthPage from './auth/AuthPage'

function App() {
  return (
    <>
      <AccountCorner />
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <BottomNav />
    </>
  )
}

export default App
