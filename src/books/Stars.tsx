type StarsProps = {
  rating: number
}

function Stars({ rating }: StarsProps) {
  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= rating ? 'star on' : 'star'}>
          ★
        </span>
      ))}
    </span>
  )
}

export default Stars
