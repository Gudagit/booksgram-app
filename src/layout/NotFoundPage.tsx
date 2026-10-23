import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <main className="content">
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link to="/">Back to Home</Link>
    </main>
  )
}

export default NotFoundPage
