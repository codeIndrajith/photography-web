import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  useDeleteHirePhotographerMutation,
  useGetHirePhotographersQuery,
} from '../slices/clientApiSlices';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import './CSS/ClientDashBoard.css';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';

const ClientDashBoard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: hirePhotographers,
    isLoading,
    error,
    refetch,
  } = useGetHirePhotographersQuery(userInfo._id);
  const [deleteBooking, { isLoading: deleteBookingLoading }] =
    useDeleteHirePhotographerMutation();

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

  const deleteHandler = async (photographerId) => {
    const res = await deleteBooking({
      photographerId: photographerId,
      clientId: userInfo._id,
    }).unwrap();
    toast.success('Booking delete success');
    refetch();
  };

  return (
    <>
      {error ? (
        <NotFound />
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className="container-fluid mt-5 p-5">
          <div className="contentSection">
            <h1 className="mb-5">My Bookings</h1>
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="d-flex align-items-center dropdownBtn"
              >
                <FaUserCircle
                  className="fa-circle"
                  style={{ marginRight: '8px' }}
                />
                <span>{userInfo.name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>{userInfo.email}</Dropdown.Item>
                <Dropdown.Item>{`${hirePhotographers.length} Booking`}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <hr className="mb-5" />
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Photographer Name</th>
                  <th scope="col">Booking Date & Time</th>
                </tr>
              </thead>

              <tbody>
                {hirePhotographers.map((photographer) => (
                  <tr key={photographer._id}>
                    <td>{photographer.photographerName}</td>
                    <td>{formatDateTime(photographer.createdAt)}</td>
                    <td
                      onClick={() => deleteHandler(photographer.photographerId)}
                    >
                      <MdOutlineDeleteOutline />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientDashBoard;
