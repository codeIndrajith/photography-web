import React from 'react';
import locationImage from '../images/location1.jpg';
import './CSS/LocationPlace.css';

const LocationPlaceScreen = () => {
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
