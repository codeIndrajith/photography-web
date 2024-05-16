import React, { useState } from 'react';
import './CSS/LocationSlider.css';
import { Link } from 'react-router-dom';

const LocationsSlider = () => {
  const [currentPage, setCurrentPage] = useState(1);

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

  const startIndex = (currentPage - 1) * 4;
  const endIndex = Math.min(startIndex + 4, locationsData.length);
  return (
    <div className="container fluid mt-5">
      <div className="row">
        <div className="col">
          <h1>Explore Place</h1>
        </div>
        <div className="col"></div>
      </div>

      {/* Card section */}
      <div className="row cards">
        <div class="cardContainer">
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
