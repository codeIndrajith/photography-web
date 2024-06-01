import React, { useState } from 'react';
import location1 from '../images/location1.jpg';
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './CSS/LocationScreen.css';
import mainImage from '../images/mainImage.jpg';
import { useGetAllLocationsQuery } from '../slices/locationOwnerApiSlices';
import Loader from './Loader';
import NotFound from './NotFound';

const Locations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: locationsData, isLoading, error } = useGetAllLocationsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Failed to fetch photographer data. Please try again later.</p>;
  }

  if (!locationsData || locationsData.length === 0) {
    return <NotFound />;
  }

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBackClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * 4;
  const endIndex = Math.min(startIndex + 4, locationsData.length);

  return (
    <>
      <div className="container-fluid mainImageSec"></div>
      <div className="container mt-5">
        {/* Header */}
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

        <div className="cardContainer row">
          {locationsData.slice(startIndex, endIndex).map((location) => (
            <Link
              to={`${location._id}`}
              className="col-md-3"
              key={location._id}
            >
              <div
                className="card-all card"
                style={{ backgroundImage: `url(${location.images[0]})` }}
              >
                <div className="information info-all">
                  <p>{location.locationName}</p>
                  <p>{location.locationAddress}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="row">
          <div className="col-md-12 d-flex justify-content-end">
            {/* Next button */}
            {endIndex < locationsData.length && (
              <button className="nextBtn" onClick={handleNextClick}>
                Next
              </button>
            )}
            {/* Back button */}
            {startIndex > 0 && (
              <button className="backBtn" onClick={handleBackClick}>
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Locations;
