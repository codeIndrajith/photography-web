import React, { useEffect, useState } from 'react';
import './CSS/LocationOwnerDashBoard.css';
import { toast } from 'react-toastify';
import {
  useAddLocationMutation,
  useGetLocationsByOwnersQuery,
} from '../slices/locationOwnerApiSlices';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import LocationForms from '../components/LocationForms';
import NotFound from '../components/NotFound';

const LocationOwnerDashBoard = () => {
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [files, setFiles] = useState([]);

  const [locationDetails, { isLoading: loadingLocationDetails }] =
    useAddLocationMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: locations,
    isLoading,
    error,
    refetch,
  } = useGetLocationsByOwnersQuery(userInfo._id);

  const fileHandler = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);
    setFiles(selectedFiles);

    // Disable the file input if 5 images are already selected
    if (selectedFiles.length >= 5) {
      e.target.disabled = true;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (locationName === '' || locationAddress === '') {
      toast.error('Please fill all the fields');
      return;
    }
    if (files.length === 0) {
      toast.error('Please add location photos');
      return;
    }
    // console.log(userInfo._id);
    try {
      const formData = new FormData();
      formData.append('locationName', locationName);
      formData.append('locationAddress', locationAddress);
      formData.append('locationOwnerId', userInfo._id);
      files.forEach((file, index) => {
        formData.append(`images`, file);
      });

      const res = await locationDetails(formData).unwrap();
      toast.success('Location details add success');
      setLocationName('');
      setLocationAddress('');
      refetch();
    } catch (error) {
      toast.error('Not add details');
    }
  };

  return (
    <div className="container-fluid mt-5 p-5">
      <div>
        <form onSubmit={submitHandler}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Location Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row mt-3">
            <label className="col-sm-2 col-form-label">Location Address</label>
            <div className="col-sm-10">
              <input
                type="text"
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row mt-3">
            <label className="col-sm-2 col-form-label">Add Photos</label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control"
                multiple
                onChange={fileHandler}
                placeholder="Password"
              />
            </div>
          </div>
          <button className="addBtn" type="submit">
            Add
          </button>
          {loadingLocationDetails && <Loader />}
        </form>
      </div>

      {/* Input details */}
      <div className="mt-5 p-3">
        <h3 className="text-center mb-4 border-bottom bg-secondary p-2 text-white">
          Location Details
        </h3>
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : error ? (
          <NotFound />
        ) : (
          <>
            {locations.map((location) => (
              <LocationForms
                key={location._id}
                location={location}
                refetch={refetch}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LocationOwnerDashBoard;
