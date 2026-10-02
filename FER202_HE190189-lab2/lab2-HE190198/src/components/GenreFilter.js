import React from 'react';

export default function GenreFilter({ selectedGenre, setSelectedGenre, sortBy, setSortBy }) {
  const genres = ['Tất cả thể loại', 'Action', 'Animation', 'Comedy', 'Drama', 'Romance', 'Sci-Fi'];

  const sortOptions = [
    { value: 'default', label: 'Sắp xếp: Mặc định' },
    { value: 'rating-desc', label: 'Sắp xếp: Đánh giá cao nhất' },
    { value: 'rating-asc', label: 'Sắp xếp: Đánh giá thấp nhất' },
    { value: 'year-desc', label: 'Sắp xếp: Năm mới nhất' },
    { value: 'year-asc', label: 'Sắp xếp: Năm cũ nhất' },
    { value: 'title-asc', label: 'Sắp xếp: Tên A-Z' }
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