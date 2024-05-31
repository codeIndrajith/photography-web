import React, { useState } from 'react';
import location1 from '../images/location1.jpg';
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './CSS/Photographers.css';

const Photographers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy data
  // Dummy photographer data
  const PhotographerData = [
    { id: 1, name: 'John Doe', address: '123 Main St, New York, NY' },
    { id: 2, name: 'Jane Smith', address: '456 Elm St, Los Angeles, CA' },
    { id: 3, name: 'Michael Johnson', address: '789 Oak St, Chicago, IL' },
    { id: 4, name: 'Emily Brown', address: '101 Pine St, San Francisco, CA' },
    { id: 5, name: 'David Lee', address: '202 Maple St, Miami, FL' },
    { id: 6, name: 'Jessica Wilson', address: '303 Birch St, Houston, TX' },
    {
      id: 7,
      name: 'Matthew Taylor',
      address: '404 Cedar St, Philadelphia, PA',
    },
    { id: 8, name: 'Sophia Martinez', address: '505 Walnut St, Phoenix, AZ' },
    {
      id: 9,
      name: 'William Anderson',
      address: '606 Spruce St, San Antonio, TX',
    },
    { id: 10, name: 'Olivia Rodriguez', address: '707 Cherry St, Dallas, TX' },
    {
      id: 11,
      name: 'Ethan Hernandez',
      address: '808 Pineapple St, Austin, TX',
    },
    { id: 12, name: 'Ava Lopez', address: '909 Peach St, Seattle, WA' },
    { id: 13, name: 'Daniel Gonzalez', address: '1010 Lemon St, Denver, CO' },
    { id: 14, name: 'Isabella Perez', address: '1111 Grape St, Boston, MA' },
    {
      id: 15,
      name: 'Alexander Wilson',
      address: '1212 Lime St, Washington, DC',
    },
    { id: 16, name: 'Mia Hernandez', address: '1313 Coconut St, Atlanta, GA' },
    { id: 17, name: 'James Brown', address: '1414 Banana St, Orlando, FL' },
  ];

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBackClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * 4;
  const endIndex = Math.min(startIndex + 4, PhotographerData.length);
  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="row">
        <div className="col text-center">
          <h1 className="mb-4 display-4">
            <strong>Our Photographers</strong>
          </h1>
          <hr className="w-25 mx-auto mb-4" />
          <p className="lead">
            Discover your photographer and embark on a journey to success
          </p>
        </div>

        {/* Card body */}
        <div className="row mt-5 conSection">
          {PhotographerData.slice(startIndex, endIndex).map((photographer) => (
            <div className="col-md-3" key={photographer.id}>
              <div className="card00 card0">
                <div className="border">
                  <h2>{photographer.name}</h2>
                  <div className="icons">
                    <i className="fa fa-codepen" aria-hidden="true"></i>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                    <i className="fa fa-dribbble" aria-hidden="true"></i>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="btnSection">
            {/* Next button */}
            {endIndex < PhotographerData.length && (
              <button className="nextBtnn" onClick={handleNextClick}>
                Next
              </button>
            )}
            {/* Back button */}
            {startIndex > 0 && (
              <button className="backBtnn" onClick={handleBackClick}>
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photographers;
