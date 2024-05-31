import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useGetHirePhotographersQuery } from '../slices/clientApiSlices';
import Loader from '../components/Loader';

const ClientDashBoard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: hirePhotographers,
    isLoading,
    error,
  } = useGetHirePhotographersQuery(userInfo._id);

  // Function to format date and time
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return `${formattedDate}  |  ${formattedTime}`;
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5">My Bookings</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Photographer Name</th>
              <th scope="col">Booking Date & Time</th>
            </tr>
          </thead>

          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan="2">
                  <Loader />
                </td>
              </tr>
            </tbody>
          ) : error ? (
            <tbody>
              <tr>
                <td colSpan="2">
                  <p>Cannot fetch data</p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {hirePhotographers.map((photographer) => (
                <tr key={photographer._id}>
                  <td>{photographer.photographerName}</td>
                  <td>{formatDateTime(photographer.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default ClientDashBoard;
