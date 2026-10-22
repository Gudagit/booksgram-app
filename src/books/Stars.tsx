type StarsProps = {
  rating: number
}

function starClass(rating: number, n: number) {
  if (rating >= n) return 'star on'
  if (rating >= n - 0.5) return 'star half'
  return 'star'
}

function Stars({ rating }: StarsProps) {
  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={starClass(rating, n)}>
          ★
        </span>
      ))}
    </span>
  )
}

export default Stars
