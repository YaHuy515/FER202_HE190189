import React from 'react';
import animals from './data';
import AnimalCard from './AnimalCard';

function showAdditional(additional) {
  if (!additional) {
    alert('No Additional Information');
    return;
  }
  const alertInformation = Object.entries(additional)
    .map(information => `${information[0]}: ${information[1]}`)
    .join('\n');
  alert(alertInformation);
}

function Exercise19() {
  return (
    <div className="container py-4" style={{ maxWidth: '960px' }}>
      {/* Header Card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h2 className="fw-bold text-dark mb-2">Exercise 19: PropTypes</h2>
          <hr style={{ borderTop: '2px solid #0f172a', margin: '10px 0 16px' }} />
          <h5 className="fst-italic text-secondary">Objectives and Outcomes</h5>
          <p className="text-muted mb-0">
            <code>PropTypes</code> is a library in React that allows you to specify the expected types of props passed to a component. It helps in validating and documenting the expected props, ensuring that they are of the correct type.
          </p>
        </div>
      </div>

      {/* Exercises Card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">Exercises</h4>
          <ul className="text-secondary mb-3" style={{ paddingLeft: '20px' }}>
            <li className="mb-2">
              <strong>Step 1</strong> &mdash; Creating an Empty Project named <code>prop_example</code>
            </li>
            <li className="mb-2">
              <strong>Step 2</strong> &mdash; Building Dynamic Components with Props (<code>AnimalCard</code> component taking name, scientificName, size, diet, additional).
            </li>
            <li className="mb-2">
              <strong>Step 3</strong> &mdash; Creating Predictable Props with <code>PropTypes</code> and <code>defaultProps</code> (validating types at runtime and providing default values for missing props).
            </li>
          </ul>

          <div className="alert alert-info py-2 px-3 mb-4" style={{ fontSize: '0.9rem' }}>
            <strong>💡 Hướng dẫn kiểm tra:</strong>
            <ul className="mb-0 mt-1 ps-3">
              <li>Nhấn nút <strong>More Info</strong> trên mỗi thẻ con vật để kích hoạt hàm <code>showAdditional(additional)</code> hiển thị hộp thoại Alert chứa thông tin chi tiết (notes, link).</li>
              <li>Thẻ <strong>Lion</strong> không có trường <code>additional</code> trong dữ liệu gốc sẽ tự động sử dụng <code>defaultProps</code> mặc định: <em>"notes: No Additional Information"</em>.</li>
            </ul>
          </div>

          {/* Live Output Container */}
          <div className="card border rounded overflow-hidden">
            <div className="card-header d-flex justify-content-between align-items-center bg-light border-bottom px-3 py-2">
              <span className="fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                LIVE OUTPUT - ANIMALS CARDS (PROPTYPES DEMO)
              </span>
              <span className="badge bg-primary">PropTypes Validated</span>
            </div>

            <div className="card-body p-4 text-center" style={{ backgroundColor: '#f8fafc' }}>
              <h1 className="fw-bold text-dark mb-4">Animals</h1>
              <div className="animals-container">
                {animals.map(animal => (
                  <AnimalCard
                    key={animal.name}
                    additional={animal.additional}
                    diet={animal.diet}
                    name={animal.name}
                    scientificName={animal.scientificName}
                    showAdditional={showAdditional}
                    size={animal.size}
                    image={animal.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion Card */}
      <div className="card shadow-sm border text-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h5 className="fst-italic text-secondary">Conclusion</h5>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
            In conclusion, <code>PropTypes</code> is a library in React that allows you to specify the expected types of props passed to a component.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Exercise19;
