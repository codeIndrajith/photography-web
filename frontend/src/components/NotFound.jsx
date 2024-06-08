import React from 'react';
import pageNotFoundImage from '../images/404.svg';

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <img
        src={pageNotFoundImage}
        className="errorImage"
        alt="Responsive image"
      />
      <h4>Oops, not found</h4>
    </div>
  );
};

export default NotFound;
