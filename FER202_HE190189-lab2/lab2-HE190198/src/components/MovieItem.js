import React from 'react';

export default function MovieItem({ movie, isFavorite, onToggleFavorite, onViewDetail }) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '12px 15px', 
      borderRadius: '6px', 
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      background: 'inherit'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '15px', paddingTop: '2px' }}>
        <span style={{ marginRight: '8px' }}>{isFavorite ? '★' : '☆'}</span>
        {movie.title}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
        <div style={{ fontSize: '14px', opacity: 0.85 }}>
          {movie.genre} &nbsp;|&nbsp; {movie.year} &nbsp;|&nbsp; ★ {movie.rating}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => onToggleFavorite(movie.id)}
            style={{ 
              padding: '4px 10px', 
              cursor: 'pointer', 
              borderRadius: '4px', 
              border: '1px solid #ccc', 
              background: 'transparent', 
              color: 'inherit',
              fontSize: '13px'
            }}
          >
            {isFavorite ? 'Bỏ thích' : 'Yêu thích'}
          </button>
          <button 
            onClick={() => onViewDetail(movie)}
            style={{ 
              padding: '4px 10px', 
              cursor: 'pointer', 
              borderRadius: '4px', 
              border: '1px solid #ccc', 
              background: 'transparent', 
              color: 'inherit',
              fontSize: '13px'
            }}
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}