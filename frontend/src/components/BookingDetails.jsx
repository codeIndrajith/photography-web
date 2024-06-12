import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useDeleteBookingMutation } from '../slices/photographerApiSlices';
import { toast } from 'react-toastify';

const BookingDetails = ({ bookings, refetch }) => {
  const [deleteBookingLocation, { isLoading }] = useDeleteBookingMutation();
  const deleteBookingHandler = async () => {
    try {
      await deleteBookingLocation(bookings._id).unwrap();
      refetch();
      toast.success('Booking delete success');
    } catch (error) {
      console.log(error);
    }
  };
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
              <td>
                <MdOutlineDeleteOutline
                  onClick={deleteBookingHandler}
                  style={{
                    fontSize: '2rem',
                    cursor: 'pointer',
                    color: 'red',
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingDetails;
