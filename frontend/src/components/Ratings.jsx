import React, { useEffect, useState } from 'react';
import { useAddRatingMutation } from '../slices/clientApiSlices';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import './CSS/GiveRatings.css';

const Ratings = ({ refetch }) => {
  const [rating, setRating] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);
  const phId = useParams();
  const [hasRated, setHasRated] = useState(false);
  const [addRating, { isLoading, error }] = useAddRatingMutation();

  const handleRating = async (e) => {
    e.preventDefault();
    if (rating <= 0) {
      toast.error('Give stars');
      return;
    }
    const res = await addRating({
      clientId: userInfo._id,
      photographerId: phId.id,
      ratingCount: rating,
    });
    toast.success('Add rating');
    refetch();
    setRating(0);
  };

  return (
    <>
      <div className="ratingContainer">
        <div>
          {[1, 2, 3, 4, 5].map((star) => {
            return (
              <span
                className="start"
                key={star}
                style={{
                  cursor: 'pointer',
                  color: rating >= star ? 'gold' : 'gray',
                  fontSize: `35px`,
                }}
                onClick={() => setRating(star)}
              >
                {' '}
                ★{' '}
              </span>
            );
          })}
        </div>

        <button
          className="ratingBtn"
          type="button"
          onClick={handleRating}
          disabled={hasRated}
        >
          Give rating
        </button>
      </div>
    </>
  );
};

export default Ratings;
