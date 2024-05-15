import React from 'react';
import location1 from '../images/location1.jpg';
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './CSS/LocationScreen.css';

const Locations = () => {
  return (
    <div className="container fluid mt-5">
      <div className="row">
        <div className="col text-center">
          <h1 className="mb-4 display-4">
            <strong>Discover Amazing Places</strong>
          </h1>
          <hr className="w-25 mx-auto mb-4" />
          <p className="lead">
            Embark on a journey to breathtaking destinations
          </p>
        </div>
      </div>

      {/* Card section */}
      <div className="row">
        <div className="col-md-3">
          <Link className="location" to="/locations/:id">
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
          </Link>
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
        <button className="btn"> See More</button>
      </div>
    </div>
  );
};

export default Locations;
