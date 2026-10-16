import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductItem from '../components/ProductItem';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 3;

const ProductList = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  const pageParam = parseInt(searchParams.get('page'), 10);
  const currentPage = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;

  // Filter products using useMemo and filter()
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesKeyword = keyword
        ? product.name.toLowerCase().includes(keyword.toLowerCase().trim())
        : true;

      const matchesCategory =
        category && category !== 'All Categories'
          ? product.category.toLowerCase() === category.toLowerCase()
          : true;

      return matchesKeyword && matchesCategory;
    });
  }, [keyword, category]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  // Use slice() to get products for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Product List</h2>

      {/* Filter and Search Bar Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-7">
              <SearchBar />
            </div>
            <div className="col-12 col-md-5">
              <CategoryFilter />
            </div>
          </div>
        </div>
      </div>

      {/* Total Products Count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 text-muted">
          Total Products: <span className="fw-bold text-dark">{totalProducts}</span>
        </h5>
        {totalPages > 0 && (
          <span className="badge bg-light text-dark border">
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

      {/* Product List Content */}
      {totalProducts === 0 ? (
        <div className="alert alert-warning text-center py-4" role="alert">
          <h5 className="alert-heading mb-1">No products available</h5>
          <p className="mb-0">Try adjusting your search keyword or category filter.</p>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-light">
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th style={{ width: '160px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default ProductList;
