import React from 'react';
import MovieItem from './MovieItem';

export default function MovieList({ movies, favorites, onToggleFavorite, onViewDetail }) {
  if (movies.length === 0) {
    return <p style={{ textAlign: 'center', opacity: 0.6 }}>No movies found.</p>;
  }

  return (
    <div>
      {movies.map(movie => (
        <MovieItem 
          key={movie.id} 
          movie={movie} 
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
}