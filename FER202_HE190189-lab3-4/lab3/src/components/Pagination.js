import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page'), 10);
  const currentPage = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;

  const goToPage = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  if (totalPages <= 0) {
    return null;
  }

  return (
    <div className="d-flex align-items-center justify-content-center gap-3 my-4">
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={handlePrevious}
        disabled={currentPage <= 1}
      >
        Previous
      </button>

      <span className="fw-semibold">
        Page: {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
