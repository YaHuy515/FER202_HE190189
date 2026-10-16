import React from 'react';

export default function MovieDetail({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
      background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' 
    }}>
      <div style={{ 
        background: '#fff', color: '#000', padding: '25px', borderRadius: '8px', 
        width: '400px', maxWidth: '90%', position: 'relative' 
      }}>
        <h3 style={{ marginTop: 0 }}>{movie.title}</h3>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Duration:</strong> {movie.duration} minutes</p>
        <p><strong>Description:</strong> {movie.description}</p>
        <button 
          onClick={onClose}
          style={{ marginTop: '15px', padding: '6px 15px', cursor: 'pointer', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Close
        </button>
      </div>
    </div>
  );
}