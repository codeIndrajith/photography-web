import React from 'react';
import errorImage from '../images/error.svg';
import { Link } from 'react-router-dom';
import './CSS/ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5 conImageError">
      <img src={errorImage} className="errorImage" alt="Responsive image" />
      <Link className="btn btn-dark" to="/">
        Home
      </Link>
    </div>
  );
};

export default ErrorPage;
