import React from 'react';

const BookingDetails = ({ bookings }) => {
  return (
    <>
      <table
        className="table table-striped table-hover"
        style={{
          backgroundColor: '#F5F5F5',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
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
    </>
  );
};

export default BookingDetails;
