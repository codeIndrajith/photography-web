import React from 'react';

const LocationForms = ({ location }) => {
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
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default LocationForms;
