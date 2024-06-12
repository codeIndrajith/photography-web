import React from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useDeleteLocationMutation } from '../slices/locationOwnerApiSlices';
import { toast } from 'react-toastify';

const LocationForms = ({ location, refetch }) => {
  const [deleteLocation, { isLoading }] = useDeleteLocationMutation();
  const locationDetailsDeleteHandler = async () => {
    try {
      await deleteLocation(location._id).unwrap();
      refetch();
      toast.success('Location delete success');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <table className="table mb-5" style={{ backgroundColor: '#E4DFD9' }}>
        <thead>
          <tr>
            <th scope="col">Location Name</th>
            <th scope="col">Location Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{location.locationName}</td>
            <td>{location.locationAddress}</td>
            <td>
              <MdOutlineDeleteOutline
                onClick={locationDetailsDeleteHandler}
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
    </>
  );
};

export default LocationForms;
