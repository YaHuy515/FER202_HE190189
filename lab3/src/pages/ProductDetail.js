import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id, 10));

  return (
    <div className="container py-4">
      <div className="mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/products')}
        >
          &larr; Back to Products
        </button>
      </div>

      {!product ? (
        <div className="card shadow-sm border-danger">
          <div className="card-body text-center py-5">
            <h4 className="text-danger fw-bold mb-2">Product Not Found</h4>
            <p className="text-muted mb-4">
              Sorry, no product exists with ID: <strong>{id}</strong>.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Back to Products List
            </button>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-light py-3">
            <h3 className="mb-0 fw-bold">{product.name}</h3>
          </div>
          <div className="card-body p-4">
            <div className="row mb-3">
              <div className="col-sm-3 fw-semibold text-muted">ID:</div>
              <div className="col-sm-9">{product.id}</div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3 fw-semibold text-muted">Name:</div>
              <div className="col-sm-9 fw-bold fs-5">{product.name}</div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3 fw-semibold text-muted">Category:</div>
              <div className="col-sm-9">
                <span className="badge bg-secondary fs-6">{product.category}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3 fw-semibold text-muted">Price:</div>
              <div className="col-sm-9 text-primary fw-bold fs-5">
                {product.price.toLocaleString('vi-VN')} đ
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3 fw-semibold text-muted">Description:</div>
              <div className="col-sm-9">{product.description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
