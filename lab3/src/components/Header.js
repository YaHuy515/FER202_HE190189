import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          ProductStore
        </Link>
        <div className="d-flex gap-2">
          <Link
            to="/"
            className={`btn btn-sm ${
              location.pathname === '/' ? 'btn-primary' : 'btn-outline-light'
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`btn btn-sm ${
              location.pathname.startsWith('/products') ? 'btn-primary' : 'btn-outline-light'
            }`}
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
