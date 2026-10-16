import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container py-5">
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm text-center">
        <div className="container-fluid py-4">
          <h1 className="display-5 fw-bold mb-3">Welcome to ProductStore</h1>
          <p className="fs-5 text-muted mb-4">
            Manage and explore products for your needs.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg px-4">
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
