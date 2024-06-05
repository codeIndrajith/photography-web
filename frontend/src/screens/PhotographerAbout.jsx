import React, { useState } from 'react';
import instagramIcon from '../images/instagram.png';
import whatsAppIcon from '../images/whatsapp.png';
import facebookIcon from '../images/facebook.png';
import gmailIcon from '../images/gmail.png';
import './CSS/PhotographyAbout.css';
import BookingPhotographerForm from '../components/bookingPhotographerForm';
import { useSelector } from 'react-redux';
import {
  useGetPhotographerQuery,
  useGetPortfolioQuery,
} from '../slices/photographerApiSlices';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import Ratings from '../components/Ratings';

const PhotographerAbout = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const id = useParams();
  const {
    data: photographer,
    isLoading,
    error,
  } = useGetPhotographerQuery(id.id);

  const {
    data: portFolio,
    isLoading: portFolioLoading,
    error: portFolioError,
  } = useGetPortfolioQuery(id.id);

  const { userInfo } = useSelector((state) => state.auth);

  if (isLoading || portFolioLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Failed to fetch photographer data. Please try again later.</p>;
  }

  if (portFolioError) {
    return <p>Failed to fetch Portfolio data. Please try again later.</p>;
  }

  if (!photographer && !portFolio) {
    return <NotFound />;
  }
  const images = [];

  portFolio.forEach((element) => {
    images.push(...element.shootImageSamples);
  });

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
          <h1 className="aboutText">About Me</h1> <hr />
          <div className="aboutMe">
            <div className="card">
              <img
                src={photographer.profilePic}
                className="card-img-top"
                alt=""
              />
            </div>
            <div className="aboutDetails">
              <h1>{photographer.firstName + ' ' + photographer.lastName}</h1>
              {portFolio.length > 0 ? (
                portFolio.map((item) => (
                  <div key={item._id} className="portfolio-item">
                    <p>{item.description}</p>
                  </div>
                ))
              ) : (
                <p>No portfolio items available.</p>
              )}
              {userInfo.status === 'client' ? (
                <div style={{ width: '100%' }}>
                  <BookingPhotographerForm clientId={userInfo._id} />
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>

        <div className="contacts">
          <h4>Get in touch</h4>
          <div className="social">
            <a href={photographer.instagramLink}>
              <img className="insta" src={instagramIcon} alt="instagram" />
            </a>
            <a href={`https://wa.me/+94${photographer.whatsAppNumber}`}>
              <img className="whats" src={whatsAppIcon} alt="whatsapp" />
            </a>
            <a href={photographer.faceBookLink}>
              <img className="face" src={facebookIcon} alt="facebook" />
            </a>
            <a href={photographer.email}>
              <img className="gmail" src={gmailIcon} alt="gmail" />
            </a>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <p className="rate">Ratings</p> <hr />
        <div className="cont">
          {/* <div className="row">
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
          </div> */}

          <Ratings />
        </div>
      </div>
    </>
  );
};

export default PhotographerAbout;
