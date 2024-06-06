import React, { useEffect, useState } from 'react';
import { useAddRatingMutation } from '../slices/clientApiSlices';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Ratings = () => {
  const [rating, setRating] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);
  const phId = useParams();
  const [hasRated, setHasRated] = useState(false);
  const [addRating, { isLoading, error }] = useAddRatingMutation();

  useEffect(() => {
    const ratedUsers = JSON.parse(localStorage.getItem('ratedUsers')) || [];
    if (ratedUsers.includes(userInfo._id)) {
      setHasRated(true);
    }
  }, [userInfo._id]);

  const handleRating = async () => {
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
    setRating(0);
    setHasRated(true); // Set hasRated to true after rating is added successfully
    const ratedUsers = JSON.parse(localStorage.getItem('ratedUsers')) || [];
    localStorage.setItem(
      'ratedUsers',
      JSON.stringify([...ratedUsers, userInfo._id])
    );
  };

  return (
    <>
      <div className="d-flex align-items-center gap-4">
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

        <button
          className="btn btn-dark"
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
