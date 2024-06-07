import React, { useState } from 'react';
import locationImage from '../images/location1.jpg';
import './CSS/LocationPlace.css';
import { useAddBookingRequestMutation } from '../slices/photographerApiSlices';
import { useGetLocationQuery } from '../slices/locationOwnerApiSlices';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';

const LocationPlaceScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const id = useParams();
  const {
    data: location,
    isLoading: locationLoading,
    error: locationFetchError,
  } = useGetLocationQuery(id.id);

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
      locationId: id.id,
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

  if (locationLoading) {
    return <Loader />;
  }

  if (locationFetchError) {
    return <p>Failed to fetch photographer data. Please try again later.</p>;
  }

  if (!location) {
    return <NotFound />;
  }

  let imageUrls = [];

  location.images.forEach((image) => {
    imageUrls.push(image);
  });

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {imageUrls.map((image, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={activeIndex === index ? 'active' : ''}
              aria-current={activeIndex === index ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {imageUrls.map((image, index) => (
            <div
              key={index}
              className={
                activeIndex === index ? 'carousel-item active' : 'carousel-item'
              }
            >
              <img
                style={{ maxHeight: '600px', objectFit: 'cover' }}
                src={image}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          onClick={handlePrev}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={handleNext}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* <div>
        <img
          className="card-img-top img-fluid"
          src={locationImage}
          alt=""
          style={{ maxHeight: '600px', objectFit: 'cover' }}
        />
      </div> */}

      <div className="container">
        <div className="row mt-5 locationsDetails">
          <div className="col-md-6 locationContent">
            <h1>{location.locationName}</h1>
            <p>{location.locationAddress}</p>

            {/* Request Location Booking Section */}
            {userInfo && userInfo.status === 'photographer' ? (
              <div className="request-booking mt-4">
                <h3>Request Location Booking</h3>
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

                {loadBooking && <Loader />}
              </div>
            ) : (
              <></>
            )}
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
