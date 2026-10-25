import { Link } from 'react-router'
import { useAuth } from './useAuth'

function AccountCorner() {
  const { user, loading, configured } = useAuth()

  // before accounts are set up (or while we check) there is nothing to show
  if (!configured || loading) return null

  return (
    <div className="account-corner">
      {user ? (
        <Link
          to="/login"
          className="corner-button corner-initial"
          aria-label={`Your account: ${user.email}`}
          title="Your account"
        >
          {(user.email ?? '?').charAt(0).toUpperCase()}
        </Link>
      ) : (
        <>
          <Link
            to="/login"
            className="corner-button"
            aria-label="Sign in"
            title="Sign in"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5" />
              <path d="M4 12h10" />
              <path d="m10 8 4 4-4 4" />
            </svg>
          </Link>
          <Link
            to="/login?mode=signup"
            className="corner-button"
            aria-label="Create an account"
            title="New account"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10" cy="8" r="4" />
              <path d="M2.5 20c0-3.4 3.4-5.5 7.5-5.5" />
              <path d="M18 14v6M15 17h6" />
            </svg>
          </Link>
        </>
      )}
    </div>
  )
}

export default AccountCorner
