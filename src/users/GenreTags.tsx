type GenreTagsProps = {
  genres: string[]
}

function GenreTags({ genres }: GenreTagsProps) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Genres</h2>
      </div>
      <div className="chips">
        {genres.map((genre) => (
          <span key={genre} className="chip">
            {genre}
          </span>
        ))}
      </div>
    </section>
  )
}

export default GenreTags
