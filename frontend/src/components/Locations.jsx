import React, { useState } from 'react';
import location1 from '../images/location1.jpg';
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './CSS/LocationScreen.css';

const Locations = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy data
  const locationsData = [
    {
      id: 1,
      name: 'Location Name 1',
      address: 'No 3/2 Vales, Korea',
      url: 'https://images.unsplash.com/photo-1613725194245-d8e21cf5d42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    },
    { id: 2, name: 'Location Name 2', address: 'No 3/2 Vales, Korea' },
    { id: 3, name: 'Location Name 3', address: 'No 3/2 Vales, Korea' },
    { id: 4, name: 'Location Name 4', address: 'No 3/2 Vales, Korea' },
    { id: 5, name: 'Location Name 5', address: 'No 3/2 Vales, Korea' },
    { id: 6, name: 'Location Name 6', address: 'No 3/2 Vales, Korea' },
    { id: 7, name: 'Location Name 7', address: 'No 3/2 Vales, Korea' },
    { id: 8, name: 'Location Name 8', address: 'No 3/2 Vales, Korea' },
    { id: 9, name: 'Location Name 9', address: 'No 3/2 Vales, Korea' },
    { id: 10, name: 'Location Name 10', address: 'No 3/2 Vales, Korea' },
    { id: 11, name: 'Location Name 11', address: 'No 3/2 Vales, Korea' },
    { id: 12, name: 'Location Name 12', address: 'No 3/2 Vales, Korea' },
    { id: 13, name: 'Location Name 13', address: 'No 3/2 Vales, Korea' },
    { id: 14, name: 'Location Name 14', address: 'No 3/2 Vales, Korea' },
    { id: 15, name: 'Location Name 15', address: 'No 3/2 Vales, Korea' },
    { id: 16, name: 'Location Name 16', address: 'No 3/2 Vales, Korea' },
    { id: 17, name: 'Location Name 17', address: 'No 3/2 Vales, Korea' },
  ];

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBackClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * 4;
  const endIndex = Math.min(startIndex + 4, locationsData.length);

  return (
    <div className="container fluid mt-5">
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

      <div class="cardContainer row">
        {locationsData.slice(startIndex, endIndex).map((location) => (
          <div className="col-md-3">
            <div
              class="card-all card"
              style={{ backgroundImage: `url(${location.url})` }}
              key={location.id}
            >
              <div class="information info-all">
                <p>{location.name}</p>
                <p>{location.address}</p>
              </div>
            </div>
          </div>
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
  );
};

export default Locations;
