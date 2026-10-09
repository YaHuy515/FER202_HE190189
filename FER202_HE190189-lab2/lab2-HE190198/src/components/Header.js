import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { MdOutlineNightlight, MdOutlineNightlightRound } from 'react-icons/md';

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      <h2 style={{ margin: 0 }}>Mini Movie Manager</h2>
      <button 
        onClick={toggleTheme}
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px', 
          padding: '6px 12px', 
          cursor: 'pointer', 
          background: 'transparent', 
          border: '1px solid currentColor', 
          borderRadius: '4px', 
          color: 'inherit',
          fontSize: '14px'
        }}
      >
        {darkMode ? (
          <>
            <MdOutlineNightlightRound size={18} /> Light
          </>
        ) : (
          <>
            <MdOutlineNightlight size={18} /> Dark
          </>
        )}
      </button>
    </div>
  );
}