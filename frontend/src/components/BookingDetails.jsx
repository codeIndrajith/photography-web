import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingDetails = ({ bookings }) => {
  return (
    <div className="container-fluid mt-5">
      <div
        className="table-responsive"
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#F5F5F5',
        }}
      >
        <table className="table table-striped table-hover mb-0">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Booking ID</th>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bookings._id}</td>
              <td>{bookings.Date}</td>
              <td>{bookings.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingDetails;
