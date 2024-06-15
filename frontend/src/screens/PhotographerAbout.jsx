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
  useGetRatingsQuery,
} from '../slices/photographerApiSlices';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import Ratings from '../components/Ratings';
import RatingShow from '../components/RatingShow';
import ErrorPage from './ErrorPage';

const PhotographerAbout = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);
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

  const {
    data: ratings,
    isLoading: ratingLoading,
    error: ratingError,
    refetch,
  } = useGetRatingsQuery(id.id);

  if (isLoading || portFolioLoading || ratingLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (portFolioError) {
    return <ErrorPage />;
  }

  if (!photographer && !portFolio && !ratings) {
    return <NotFound />;
  }

  const images = [];
  let average = 0;

  if (ratingError) {
    console.log(ratingError);
  } else {
    let total = 0;
    {
      ratings.map((rating) => {
        total = total + rating.ratingCount;
      });
      average = Math.max(0, Math.min(total / ratings.length, 5));
    }
  }

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
                style={{ maxHeight: '100vh', objectFit: 'cover' }}
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
        <div className="col aboutSection">
          <h1 className="aboutText">About Me</h1> <hr />
          <div className="aboutMe">
            <div className="image-rating">
              <div className="imageSection">
                <img
                  src={photographer.profilePic}
                  className="card-img-top profileImage"
                  alt=""
                />
              </div>
              <div>
                {ratingError ? (
                  <div className="card card-body">
                    <RatingShow starRatingCount={0} />
                  </div>
                ) : (
                  <div className="card card-body">
                    <RatingShow starRatingCount={Math.round(average)} />
                  </div>
                )}
              </div>
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
              {userInfo && userInfo.status === 'client' ? (
                <div style={{ width: '100%' }}>
                  <BookingPhotographerForm clientId={userInfo._id} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="contacts">
          <h4>Get in touch</h4>
          <hr />
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

      <div className="ratingSection">
        {userInfo && userInfo.status === 'client' ? (
          <div className="container">
            <p className="rate">Ratings</p> <hr />
            <div className="cont">
              <h3>What About My Service ?</h3>
              <Ratings refetch={refetch} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PhotographerAbout;
