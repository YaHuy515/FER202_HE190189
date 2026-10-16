import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get('keyword') || '';
  const [searchInput, setSearchInput] = useState(keywordFromUrl);

  useEffect(() => {
    setSearchInput(keywordFromUrl);
  }, [keywordFromUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    const trimmed = searchInput.trim();

    if (trimmed) {
      newParams.set('keyword', trimmed);
    } else {
      newParams.delete('keyword');
    }

    // Reset page number to 1 when search keyword changes
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleClear = () => {
    setSearchInput('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('keyword');
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 align-items-center">
      <label htmlFor="search-input" className="form-label mb-0 fw-semibold text-nowrap">
        Search Product:
      </label>
      <input
        id="search-input"
        type="text"
        className="form-control"
        placeholder="Enter product name..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="submit" className="btn btn-primary text-nowrap">
        Search
      </button>
      {keywordFromUrl && (
        <button
          type="button"
          className="btn btn-outline-secondary text-nowrap"
          onClick={handleClear}
        >
          Clear
        </button>
      )}
    </form>
  );
};

export default SearchBar;
