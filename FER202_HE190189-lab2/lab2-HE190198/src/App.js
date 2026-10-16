import React, { useState, useMemo } from 'react';
import { movies } from './data/movies';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

function MovieApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [sortBy, setSortBy] = useState('default');
  const [favorites, setFavorites] = useLocalStorage('movie_favorites', []);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { darkMode } = useTheme();

  // Xử lý Thêm/Xóa Favorite
  const handleToggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Sử dụng useMemo để tính toán danh sách phim dựa trên Search, Genre Filter và Sắp xếp
  const filteredMovies = useMemo(() => {
    let result = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All Genres' || selectedGenre === 'All' || selectedGenre === 'Tất cả thể loại' || movie.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    if (sortBy === 'rating-desc') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'rating-asc') {
      result = [...result].sort((a, b) => a.rating - b.rating);
    } else if (sortBy === 'year-desc') {
      result = [...result].sort((a, b) => b.year - a.year);
    } else if (sortBy === 'year-asc') {
      result = [...result].sort((a, b) => a.year - b.year);
    } else if (sortBy === 'title-asc') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [searchTerm, selectedGenre, sortBy]);

  return (
    <div style={{ 
      backgroundColor: darkMode ? '#18191a' : '#f0f2f5', 
      color: darkMode ? '#e4e6eb' : '#050505', 
      minHeight: '100vh', 
      padding: '20px',
      transition: 'all 0.3s'
    }}>
      <div style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        background: darkMode ? '#242526' : '#ffffff', 
        padding: '25px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Header />
        
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <GenreFilter 
          selectedGenre={selectedGenre} 
          setSelectedGenre={setSelectedGenre} 
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div style={{ margin: '15px 0', fontSize: '15px', fontWeight: 'bold' }}>
          Total: {movies.length} | Favorites: {favorites.length} | Showing: {filteredMovies.length}
        </div>

        <MovieList 
          movies={filteredMovies} 
          favorites={favorites} 
          onToggleFavorite={handleToggleFavorite}
          onViewDetail={setSelectedMovie}
        />

        <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MovieApp />
    </ThemeProvider>
  );
}