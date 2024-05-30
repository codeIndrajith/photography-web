import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientDashBoard = () => {
  // Sample data for demonstration
  const bookings = [
    {
      id: 1,
      photographerName: 'John Doe',
      date: '2024-06-01',
      time: '10:00 AM',
    },
    {
      id: 2,
      photographerName: 'Jane Smith',
      date: '2024-06-05',
      time: '2:00 PM',
    },
  ];

  return (
    <div className="container mt-5">
      <h2>My Bookings</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Photographer Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <th scope="row">{booking.id}</th>
                <td>{booking.photographerName}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientDashBoard;
