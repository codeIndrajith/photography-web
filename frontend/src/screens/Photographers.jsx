import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Photographers.css';
import { useGetAllPhotographersQuery } from '../slices/photographerApiSlices';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import ErrorPage from '../screens/ErrorPage';

const Photographers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const {
    data: photographerData,
    isLoading: photographerDataLoading,
    error: photographerDataError,
  } = useGetAllPhotographersQuery();

  if (photographerDataLoading) {
    return <Loader />;
  }

  if (photographerDataError) {
    return <ErrorPage />;
  }

  if (!photographerData || photographerData.length === 0) {
    return <NotFound />;
  }

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBackClick = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="phContainer">
      <div className="text-center bannerPhotographer">
        <h1 className="mb-0 display-4">
          <strong>Our Photographers</strong>
        </h1>
        <hr className="w-25 mx-auto mb-4" />
        <p className="lead">
          Discover your photographer and embark on a journey to success
        </p>
      </div>
      {/* Header */}
      <div className="phMainSection">
        <div className="row mt-5 conSection">
          {photographerData.slice(startIndex, endIndex).map((photographer) => (
            <Link
              to={`/photographers/${photographer._id}`}
              className="col-md-3"
              key={photographer._id}
            >
              <div
                className="card00 card0"
                style={{
                  backgroundImage: `url(${photographer.profilePic})`,
                }}
              >
                <div className="border">
                  <h2>
                    {photographer.firstName + ' ' + photographer.lastName}
                  </h2>
                  <div className="icons">
                    <i className="fa fa-codepen" aria-hidden="true"></i>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                    <i className="fa fa-dribbble" aria-hidden="true"></i>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="btnContainer">
        <div className="btnSection">
          {startIndex > 0 && (
            <button className="backBtnn" onClick={handleBackClick}>
              Back
            </button>
          )}
          {endIndex < photographerData.length && (
            <button className="nextBtnn" onClick={handleNextClick}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Photographers;
