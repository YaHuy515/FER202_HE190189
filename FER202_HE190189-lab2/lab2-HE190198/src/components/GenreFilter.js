import React from 'react';

export default function GenreFilter({ selectedGenre, setSelectedGenre, sortBy, setSortBy }) {
  const genres = ['All Genres', 'Action', 'Animation', 'Comedy', 'Drama', 'Romance', 'Sci-Fi'];

  const sortOptions = [
    { value: 'default', label: 'Sort: Default' },
    { value: 'rating-desc', label: 'Sort: Highest Rating' },
    { value: 'rating-asc', label: 'Sort: Lowest Rating' },
    { value: 'year-desc', label: 'Sort: Newest Year' },
    { value: 'year-asc', label: 'Sort: Oldest Year' },
    { value: 'title-asc', label: 'Sort: Title A-Z' }
  ];

  return (
    <div style={{ display: 'flex', gap: '10px', margin: '10px 0 15px 0' }}>
      <select 
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: 'inherit', color: 'inherit' }}
      >
        {genres.map((genre, index) => (
          <option key={index} value={genre}>{genre}</option>
        ))}
      </select>

      {setSortBy && (
        <select
          value={sortBy || 'default'}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: 'inherit', color: 'inherit' }}
        >
          {sortOptions.map((opt, index) => (
            <option key={index} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}
    </div>
  );
}