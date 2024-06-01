import React, { useState } from 'react';
import './CSS/LocationSlider.css';
import { Link } from 'react-router-dom';
import { useGetAllLocationsQuery } from '../slices/locationOwnerApiSlices';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';

const LocationsSlider = () => {
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

  const startIndex = (currentPage - 1) * 4;
  const endIndex = Math.min(startIndex + 4, locationsData.length);
  return (
    <div className="container mt-5 locationSec">
      <div className="row">
        <div className="col">
          <h1>Explore Our Place</h1>
        </div>
      </div>

      {/* Card section */}
      <div className="cards">
        <div className="cardContainer">
          <>
            {locationsData.slice(startIndex, endIndex).map((location) => (
              <Link
                to={`locations/${location._id}`}
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
          </>
        </div>
      </div>
      <div className="seeMore">
        <Link to="/locations">
          {' '}
          <button> See More</button>
        </Link>
      </div>
    </div>
  );
};

export default LocationsSlider;
