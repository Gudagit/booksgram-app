type BookCardProps = {
    title: string
    author: string
    color: string
  }
  
  function BookCard({ title, author, color }: BookCardProps) {
    return (
      <div style={{ width: '120px' }}>
        <div
          style={{
            backgroundColor: color,
            width: '120px',
            height: '180px',
            color: 'white',
            padding: '8px',
            boxSizing: 'border-box',
          }}
        >
          {title}
        </div>
        <p>{author}</p>
      </div>
    )
  }
  
  export default BookCard
  