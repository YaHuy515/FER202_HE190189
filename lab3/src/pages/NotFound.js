import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5 text-center">
      <div className="card shadow-sm p-5 border-0">
        <h2 className="fw-semibold mb-3">404 - Không tìm thấy trang</h2>
        <p className="text-muted mb-4">
          Trang bạn đang tìm kiếm không tồn tại
        </p>
        <div>
          <Link to="/" className="btn btn-primary px-4">
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
