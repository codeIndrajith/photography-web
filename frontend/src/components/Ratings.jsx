import React, { useState } from 'react';

const Ratings = ({ onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    setRatingCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="text-center">
      <h1>Rate the Photographer</h1>
      <div className="d-flex justify-content-center align-items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            starId={star}
            rating={rating}
            hover={hover}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(star)}
          />
        ))}
      </div>
    </div>
  );
};

const Star = ({
  starId,
  rating,
  hover,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const isFilled = starId <= (hover || rating);

  return (
    <span
      className={`fs-1 me-1 ${isFilled ? 'text-warning' : 'text-secondary'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      &#9733;
    </span>
  );
};

export default Ratings;
