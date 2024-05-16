import React, { useState } from 'react';
import { TiStar } from 'react-icons/ti';
import { TiStarHalf } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';
import sample1 from '../images/photography001.jpg';
import sample2 from '../images/photography002.jpg';
import sample3 from '../images/photography003.jpg';
import ph001 from '../images/ph001.jpg';
import instagramIcon from '../images/instagram.png';
import whatsAppIcon from '../images/whatsapp.png';
import facebookIcon from '../images/facebook.png';
import gmailIcon from '../images/gmail.png';
import './CSS/PhotographyAbout.css';

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
      <div className="container mt-5">
        <div className="col">
          <h2 className="aboutText">About Me</h2> <hr />
          <div className="aboutMe">
            <div className="card">
              <img src={ph001} className="card-img-top" alt="" />
            </div>
            <div className="aboutDetails">
              <h1>I'am Jhone</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure
                amet voluptatibus adipisci nesciunt quas doloremque pariatur
                velit suscipit voluptatum, cum aspernatur, explicabo dolor ipsum
                obcaecati! Corrupti asperiores dolore sequi beatae.
              </p>
              <button className="button">
                <a href={`https://wa.me/+94${123}`}>Hire Me</a>
              </button>
            </div>
          </div>
        </div>

        <div className="contacts">
          <h4>Get in touch</h4>
          <div className="social">
            <a href="#">
              <img className="insta" src={instagramIcon} alt="instagram" />
            </a>
            <a href={`https://wa.me/+94${123}`}>
              <img className="whats" src={whatsAppIcon} alt="whatsapp" />
            </a>
            <a href="#">
              <img className="face" src={facebookIcon} alt="facebook" />
            </a>
            <a href="#">
              <img className="gmail" src={gmailIcon} alt="gmail" />
            </a>
          </div>
          <p className="rate">Ratings</p> <hr />
          <div className="cont">
            <div className="row">
              <div className="rating-card">
                <strong>Jhone deo</strong>
                <h5>Data : 2024/02/03</h5>
                <div className="col">
                  <p>Best Photographer</p>
                  <div className="rating-stars">
                    <TiStar />
                    <TiStar />
                    <TiStar />
                    <TiStar />
                    <TiStarHalf />
                  </div>
                </div>
              </div>

              <div className="rating-card">
                <strong>Jhone deo</strong>
                <h5>Data : 2024/02/03</h5>
                <div className="col">
                  <p>Best Photographer</p>
                  <div className="rating-stars">
                    <TiStar />
                    <TiStar />
                    <TiStar />
                    <TiStarOutline />
                    <TiStarOutline />
                  </div>
                </div>
              </div>

              <div className="rating-card">
                <strong>Jhone deo</strong>
                <h5>Data : 2024/02/03</h5>
                <div className="col">
                  <p>Best Photographer</p>
                  <div className="rating-stars">
                    <TiStar />
                    <TiStar />
                    <TiStar />
                    <TiStarOutline />
                    <TiStarOutline />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="rating-card">
                <strong>Jhone deo</strong>
                <h5>Data : 2024/02/03</h5>
                <div className="col">
                  <p>Best Photographer</p>
                  <div className="rating-stars">
                    <TiStar />
                    <TiStar />
                    <TiStarHalf />
                    <TiStarHalf />
                    <TiStarOutline />
                  </div>
                </div>
              </div>

              <div className="rating-card">
                <strong>Jhone deo</strong>
                <h5>Data : 2024/02/03</h5>
                <div className="col">
                  <p>Best Photographer</p>
                  <div className="rating-stars">
                    <TiStar />
                    <TiStar />
                    <TiStar />
                    <TiStar />
                    <TiStarOutline />
                  </div>
                </div>
              </div>

              <div className="rating-card">
                <strong>Jhone deo</strong>
                <h5>Data : 2024/02/03</h5>
                <div className="col">
                  <p>Best Photographer</p>
                  <div className="rating-stars">
                    <TiStar />
                    <TiStar />
                    <TiStarOutline />
                    <TiStarOutline />
                    <TiStarOutline />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotographerAbout;
