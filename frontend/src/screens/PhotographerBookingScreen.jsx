import React from 'react';
import BookingDetails from '../components/BookingDetails';
import { useGetBookingByPhotographerQuery } from '../slices/photographerApiSlices';
import { useSelector } from 'react-redux';
import NotFound from '../components/NotFound';
import Loader from '../components/Loader';
import { Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const PhotographerBookingScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: bookingDetails,
    isLoading: bookingDetailsLoading,
    error: bookingError,
  } = useGetBookingByPhotographerQuery(userInfo._id);
  return (
    <>
      {bookingDetailsLoading ? (
        <Loader />
      ) : bookingError ? (
        <NotFound />
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
                <span>
                  {userInfo.name ||
                    userInfo.firstName + ' ' + userInfo.lastName}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>{userInfo.email}</Dropdown.Item>
                <Dropdown.Item>{`${bookingDetails.length} Booking`}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Input details */}

          <div className="mt-5 p-3">
            <h3 className="text-center mb-4 border-bottom bg-secondary p-2 text-white">
              Booking details
            </h3>

            <div>
              {bookingDetails.map((bookings) => (
                <BookingDetails key={bookings._id} bookings={bookings} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotographerBookingScreen;
