import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <tr>
      <td>{product.id}</td>
      <td className="fw-semibold">{product.name}</td>
      <td>
        <span className="badge bg-secondary">{product.category}</span>
      </td>
      <td className="text-primary fw-bold">
        {product.price.toLocaleString('vi-VN')} đ
      </td>
      <td>
        <Link
          to={`/products/${product.id}`}
          className="btn btn-sm btn-outline-primary"
        >
          View Details
        </Link>
      </td>
    </tr>
  );
};

export default ProductItem;
