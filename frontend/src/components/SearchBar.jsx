import React, { useState } from 'react';
import { useGetAllPhotographersQuery } from '../slices/photographerApiSlices';
import { useGetAllLocationsQuery } from '../slices/locationOwnerApiSlices';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import ErrorPage from '../screens/ErrorPage';
import './CSS/SearchBar.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ searchValue }) => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const {
    data: allPhotographers,
    isLoading: photographerLoading,
    error: photographersError,
  } = useGetAllPhotographersQuery();
  const {
    data: allLocations,
    isLoading: locationsLoading,
    error: locationsError,
  } = useGetAllLocationsQuery();

  if (photographerLoading || locationsLoading) {
    return <Loader />;
  }
  if (photographersError || locationsError) {
    return <ErrorPage />;
  }
  if (!allPhotographers && !allLocations) {
    return <NotFound />;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const words = value.split(' ').map((word) => word.toLowerCase());

    if (searchValue === 'photographer') {
      if (value === '') {
        toast.error('Fill what you want..');
        return;
      }
      const foundPhotographer = allPhotographers.filter((photographer) => {
        const fullName = (
          photographer.firstName +
          ' ' +
          photographer.lastName
        ).toLowerCase();
        return words.some((word) => fullName.includes(word));
      });

      if (foundPhotographer.length > 0) {
        foundPhotographer.forEach((photographer) => {
          navigate(`photographers/${photographer._id}`);
        });
        setValue('');
      } else {
        navigate('/error');
      }
    }

    if (searchValue === 'location') {
      if (value === '') {
        toast.error('Fill what you want..');
        return;
      }
      const foundLocation = allLocations.filter((location) => {
        const locName = location.locationName.toLowerCase();
        return words.some((word) => locName.includes(word));
      });

      if (foundLocation.length > 0) {
        foundLocation.forEach((location) => {
          navigate(`/locations/${location._id}`);
        });

        setValue('');
      } else {
        navigate('/error');
      }
    }
  };

  return (
    <nav className="navbar navbar-light" onSubmit={submitHandler}>
      <form
        style={{ width: '100%', marginTop: '50px' }}
        className="d-flex gap-5 form-inline justify-content-center searchBarSection"
      >
        {searchValue === 'photographer' ? (
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Photographer"
            aria-label="Search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : searchValue === 'location' ? (
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Location"
            aria-label="Search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <></>
        )}
        <button
          className="btn btn-outline-success text-dark my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default SearchBar;
