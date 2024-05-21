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
    <div className="container main-container">
      <div className="header-section">
        <span className="line"></span>
        <h1>Featured Photographer</h1>
      </div>
      <div className="content-section">
        <div className="content-left">
          <div className="details">
            <h1>Find Your Photographer</h1>
          </div>
          <div className="side-image-container">
            <img className="side-image" src={photographer} alt="photography" />
          </div>
        </div>
        <div className="carousel-section">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            loop={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <div className="swiperSlides">
              <SwiperSlide>
                <Link to="/photographers/1">Slide 1</Link>
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
          <p className="section">
            <Link className="check" to="/photographers">
              <button>See More</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
