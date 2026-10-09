import React, { useEffect, useRef } from 'react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const inputRef = useRef(null);

  // Focus tự động vào ô tìm kiếm khi load trang
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div style={{ margin: '15px 0 10px 0' }}>
      <input 
        ref={inputRef}
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
  );
}