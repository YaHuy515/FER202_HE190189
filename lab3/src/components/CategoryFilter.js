import React from 'react';
import { useSearchParams } from 'react-router-dom';

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All Categories';

  const categories = ['All Categories', 'Điện thoại', 'Laptop', 'Máy tính bảng', 'Phụ kiện'];

  const handleChange = (e) => {
    const selected = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (selected && selected !== 'All Categories') {
      newParams.set('category', selected);
    } else {
      newParams.delete('category');
    }

    // Reset page number to 1 when category changes
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <div className="d-flex gap-2 align-items-center">
      <label htmlFor="category-select" className="form-label mb-0 fw-semibold text-nowrap">
        Category:
      </label>
      <select
        id="category-select"
        className="form-select"
        value={currentCategory}
        onChange={handleChange}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
