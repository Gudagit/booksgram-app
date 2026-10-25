import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

type Mode = 'signin' | 'signup'

const MIN_PASSWORD = 8

function AuthPage() {
  const { user, loading, configured, signOut } = useAuth()
  const navigate = useNavigate()
  // the address decides the form: /login?mode=signup opens "Create an account"
  const [params, setParams] = useSearchParams()
  const mode: Mode = params.get('mode') === 'signup' ? 'signup' : 'signin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return
    setBusy(true)
    setMessage(null)

    const credentials = { email: email.trim(), password }
    const { data, error } =
      mode === 'signup'
        ? await supabase.auth.signUp(credentials)
        : await supabase.auth.signInWithPassword(credentials)
    setBusy(false)

    if (error) {
      setMessage(error.message)
      return
    }
    // no session means the project wants the email confirmed first
    if (!data.session) {
      setMessage('Check your email to confirm your account, then sign in.')
      return
    }
    navigate('/')
  }

  function switchMode() {
    setParams(mode === 'signin' ? { mode: 'signup' } : {})
    setMessage(null)
  }

  if (!configured) {
    return (
      <main className="feed auth">
        <h1>Sign in</h1>
        <p className="muted">
          Accounts are not set up on this site yet. Everything here is a demo.
        </p>
        <Link to="/">Back to Profile</Link>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="feed auth">
        <p className="muted" role="status">
          Loading…
        </p>
      </main>
    )
  }

  if (user) {
    return (
      <main className="feed auth">
        <h1>Your account</h1>
        <section className="panel auth-form">
          <p>
            You are signed in as <strong>{user.email}</strong>.
          </p>
          <button type="button" className="button" onClick={signOut}>
            Sign out
          </button>
        </section>
        <Link to="/">Back to Profile</Link>
      </main>
    )
  }

  return (
    <main className="feed auth">
      <h1>{mode === 'signin' ? 'Sign in' : 'Create an account'}</h1>
      <form className="panel auth-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="auth-email">Email</label>
          <input
            id="auth-email"
            type="email"
            value={email}
            required
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            value={password}
            required
            minLength={MIN_PASSWORD}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            onChange={(event) => setPassword(event.target.value)}
          />
          {mode === 'signup' && (
            <span className="muted">At least {MIN_PASSWORD} characters.</span>
          )}
        </div>

        {message && (
          <p className="auth-message" role="alert">
            {message}
          </p>
        )}

        <button type="submit" className="button" disabled={busy}>
          {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
        <button type="button" className="button ghost" onClick={switchMode}>
          {mode === 'signin' ? 'New here? Create an account' : 'Have an account? Sign in'}
        </button>
      </form>
      <Link to="/">Back to Profile</Link>
    </main>
  )
}

export default AuthPage
