import React from 'react';
import './CSS/Portfolio.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import photographer from '../images/photographer.jpg';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

const Portfolio = () => {
  return (
    <div className="container mt-4 px-5">
      <div className="row py-2 px-5 text-center mb-5">
        <span className="line"></span>
        <h1>Featured Photographer</h1>
      </div>
      <div className="row conSection">
        <div className="col-md-6 mb-4">
          <div className="details">
            <h2>Find Your Photographer</h2>
            <p className="section">
              <Link className="check" to="/photographers">
                Check it out
              </Link>
            </p>
          </div>
          <div className="sideImageCon">
            <img
              className="sideImage"
              src={photographer}
              alt="photographyImage"
            />
          </div>
        </div>
        <div className="col-md-6 carouselSec px-1">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            loop={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <div className="swiperSlides">
              <SwiperSlide>
                <Link to="/photographers/:id">Slide 1</Link>
              </SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
