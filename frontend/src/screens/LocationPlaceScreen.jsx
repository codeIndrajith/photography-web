import React, { useState } from 'react';
import locationImage from '../images/location1.jpg';
import './CSS/LocationPlace.css';
import { useAddBookingRequestMutation } from '../slices/photographerApiSlices';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const LocationPlaceScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  // const id = useParams();
  const id = '66374ca898f0884c69a52efd';

  const [addBooking, { isLoading: loadBooking }] =
    useAddBookingRequestMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (name === '' || email === '' || date === '' || message === '') {
      toast.error('add all fileds');
      return;
    }

    const res = await addBooking({
      locationId: id,
      photographerId: userInfo._id,
      name,
      email,
      date,
      message,
    });
    toast.success('Booking success');
    setName('');
    setEmail('');
    setDate('');
    setMessage('');
  };

  return (
    <>
      <div>
        <img
          className="card-img-top img-fluid"
          src={locationImage}
          alt=""
          style={{ maxHeight: '600px', objectFit: 'cover' }}
        />
      </div>

      <div className="container">
        <div className="row mt-5 locationsDetails">
          <div className="col-md-6 locationContent">
            <h1>Location Name</h1>
            <p>Location Address</p>

            {/* Request Location Booking Section */}
            <div className="request-booking mt-4">
              <h2>Request Location Booking</h2>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Preferred Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="3"
                    placeholder="Additional Information"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6 map">
            <h1>Location map here</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationPlaceScreen;
