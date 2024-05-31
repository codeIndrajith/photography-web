import React, { useState } from 'react';
import { useBookingPhotographerMutation } from '../slices/clientApiSlices';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import { useGetPhotographerQuery } from '../slices/photographerApiSlices';

const BookingPhotographerForm = ({ clientId }) => {
  const [description, setDescription] = useState('');
  const id = '66374ca898f0884c69a52efd';
  const { data: photographer, isLoading, error } = useGetPhotographerQuery(id);
  const [booking, { isLoading: bookingLoading }] =
    useBookingPhotographerMutation();
  // const params = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (description === '') {
      toast.error('Fill form');
      return;
    } else {
      try {
        const res = await booking({
          photographerName:
            photographer.firstName + ' ' + photographer.lastName,
          description,
          clientId: clientId,
          photographerId: id,
        }).unwrap();
        setDescription('');
        toast.success('Booking success');
      } catch (error) {
        toast.error(`${error}`);
      }
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label
          className="form-label"
          style={{
            fontSize: '18px',
            color: 'white',
            backgroundColor: 'black',
            width: '100%',
            padding: '5px 5px',
            textAlign: 'center',
          }}
        >
          Tell what you want
        </label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          rows="3"
        ></textarea>
      </div>
      <button className="button" type="submit">
        Hire Me
      </button>
      {bookingLoading && <Loader />}
    </form>
  );
};

export default BookingPhotographerForm;
