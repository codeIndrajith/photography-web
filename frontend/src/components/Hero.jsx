import { useState } from 'react';
import './CSS/Hero.css';
import SearchBar from './SearchBar';

const Hero = () => {
  const [value, setValue] = useState('');
  return (
    <div className="mainSection">
      <div className="content">
        <h1>Hello, Welcome to FrameWorkX</h1>
        <p>Find Photographers Shooting Locations one place</p>
        <div className="searchSection">
          <button
            className="valueBtn"
            type="button"
            onClick={() => setValue('photographer')}
          >
            photographer
          </button>
          <button
            className="valueBtn"
            type="button"
            onClick={() => setValue('location')}
          >
            location
          </button>

          {value === 'photographer' ? (
            <div className="search-bar">
              <SearchBar searchValue={value} />
            </div>
          ) : value === 'location' ? (
            <div className="search-bar">
              <SearchBar searchValue={value} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
