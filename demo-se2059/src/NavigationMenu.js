import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/users/HE190189', label: 'User Profile (HE190189)' },
    { to: '/users', label: 'User Profile (No ID)' },
  ];

  return (
    <nav className="navbar navbar-expand bg-dark text-white rounded px-3 py-2 mb-3 shadow-sm">
      <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between gap-2">
        <span className="navbar-brand mb-0 text-info fw-bold fs-6">
          Decoupled Router Menu
        </span>
        <div className="d-flex flex-wrap gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`btn btn-sm ${
                  isActive ? 'btn-primary text-white fw-bold shadow' : 'btn-outline-light'
                }`}
                style={{ transition: 'all 0.15s ease-in-out', cursor: 'pointer' }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
