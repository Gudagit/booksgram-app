type BookCardProps = {
  title: string
  author: string
  color: string
}

function BookCard({ title, author, color }: BookCardProps) {
  return (
    <div>
      <div className="cover book-card-cover" style={{ backgroundColor: color }}>
        {title}
      </div>
      <p className="book-card-title">{title}</p>
      <p className="book-card-author">{author}</p>
    </div>
  )
}

export default BookCard
