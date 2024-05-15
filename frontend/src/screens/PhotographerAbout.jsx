import React, { useState } from 'react';
import sample1 from '../images/photography001.jpg';
import sample2 from '../images/photography002.jpg';
import sample3 from '../images/photography003.jpg';

const PhotographerAbout = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [sample1, sample2, sample3];

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
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
          {images.map((image, index) => (
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
          {images.map((image, index) => (
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
      <div className="container">
        <div className="col">
          <h2>About Me</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure amet
            voluptatibus adipisci nesciunt quas doloremque pariatur velit
            suscipit voluptatum, cum aspernatur, explicabo dolor ipsum
            obcaecati! Corrupti asperiores dolore sequi beatae.
          </p>
        </div>

        <div className="col">
          <h2>Done by me</h2>
          <div className="row">
            <h1>My works</h1>
          </div>
        </div>

        <div className="col">
          <h4>FInd me on</h4>
          <div className="row">
            <p>Instagram</p>
            <p>Facebook</p>
            <p>Gmail</p>
            <p>Call</p>
          </div>
          <h4>Ratings</h4>
          <div className="row">
            <p>ratings</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotographerAbout;
