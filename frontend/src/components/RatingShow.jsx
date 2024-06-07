import React from 'react';
import './CSS/StarRating.css';

const RatingShow = ({ starRatingCount }) => {
  // Ensure rating is within the range of 0 to 5
  const clampedRating = Math.max(0, Math.min(starRatingCount, 5));

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < clampedRating ? 'filled' : ''}`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default RatingShow;
