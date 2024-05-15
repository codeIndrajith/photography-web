import React from 'react';
import './CSS/LocationSlider.css';
import location1 from '../images/location1.jpg';
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

const LocationsSlider = () => {
  return (
    <div className="container fluid mt-5">
      <div className="row">
        <div className="col">
          <h1>Explore Place</h1>
        </div>
        <div className="col"></div>
      </div>

      {/* Card section */}
      <div className="row">
        <div className="col-md-3">
          <div className="card mb-4">
            <img src={location1} className="card-img-top" alt="" />
            <div className="card-overlay">
              <MdLocationOn className="location-icon" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Location Name</h5>
              <p>No 3/2 Vales, Korea</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-4">
            <img src={location1} className="card-img-top" alt="" />
            <div className="card-overlay">
              <MdLocationOn className="location-icon" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Location Name</h5>
              <p>No 3/2 Vales, Korea</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-4">
            <img src={location1} className="card-img-top" alt="" />
            <div className="card-overlay">
              <MdLocationOn className="location-icon" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Location Name</h5>
              <p>No 3/2 Vales, Korea</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-4">
            <img src={location1} className="card-img-top" alt="" />
            <div className="card-overlay">
              <MdLocationOn className="location-icon" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Location Name</h5>
              <p>No 3/2 Vales, Korea</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="card mb-4">
            <img src={location1} className="card-img-top" alt="" />
            <div className="card-overlay">
              <MdLocationOn className="location-icon" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Location Name</h5>
              <p>No 3/2 Vales, Korea</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-4">
            <img src={location1} className="card-img-top" alt="" />
            <div className="card-overlay">
              <MdLocationOn className="location-icon" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Location Name</h5>
              <p>No 3/2 Vales, Korea</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-4">
            <img src={location1} className="card-img-top" alt="" />
            <div className="card-overlay">
              <MdLocationOn className="location-icon" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Location Name</h5>
              <p>No 3/2 Vales, Korea</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-4">
            <img src={location1} className="card-img-top" alt="" />
            <div className="card-overlay">
              <MdLocationOn className="location-icon" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Location Name</h5>
              <p>No 3/2 Vales, Korea</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <Link to="/locations">
          {' '}
          <button className="btn"> See More</button>
        </Link>
      </div>
    </div>
  );
};

export default LocationsSlider;
