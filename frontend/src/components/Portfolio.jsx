import React from 'react';
import './CSS/Portfolio.css';
import photographer from '../images/photographer.jpg';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  return (
    <div className="container main-container">
      <div className="header-section">
        <span className="line"></span>
        <h1>Featured Photographer</h1>
      </div>
      <div className="content-section">
        <div className="content-left">
          <div className="details">
            <h1>Find Your Photographer</h1>
            <Link className="check" to="/photographers">
              <button className="see-more-btn">See More</button>
            </Link>
          </div>
        </div>
        <div className="side-image-container">
          <img className="side-image" src={photographer} alt="photography" />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
