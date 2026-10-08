import React from 'react';
import PropTypes from 'prop-types';
import './AnimalCard.css';

export default function AnimalCard({
  additional,
  diet,
  name,
  scientificName,
  showAdditional,
  size,
  image
}) {
  return (
    <div className="animal-card">
      {image && (
        <div className="animal-image-wrapper">
          <img src={image} alt={name} className="animal-image" />
        </div>
      )}
      <div className="animal-content">
        <div className="animal-name">{name}</div>
        
        <div className="animal-info-box">
          <div className="animal-info-row">
            Scientific Name: {scientificName}
          </div>
          <div className="animal-info-row">
            {size} kg
          </div>
          <div className="animal-info-row">
            {diet ? diet.join(', ') : ''}.
          </div>
        </div>

        <button 
          className="btn-more-info" 
          onClick={() => showAdditional(additional)}
        >
          More Info
        </button>
      </div>
    </div>
  );
}

AnimalCard.propTypes = {
  additional: PropTypes.shape({
    link: PropTypes.string,
    notes: PropTypes.string
  }),
  diet: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  scientificName: PropTypes.string.isRequired,
  showAdditional: PropTypes.func.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  image: PropTypes.string
};

AnimalCard.defaultProps = {
  additional: {
    notes: 'No Additional Information',
    link: 'No Additional Information'
  }
};
