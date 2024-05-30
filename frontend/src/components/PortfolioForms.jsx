import React from 'react';

const PortfolioForms = ({ photographerDetail }) => {
  return (
    <>
      <table className="table mb-5" style={{ backgroundColor: '#E4DFD9' }}>
        <thead>
          <tr>
            <th scope="col">Profile pic</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src={photographerDetail.profilePic}
                className="img-thumbnail"
                alt="..."
              />
            </td>
            <td>{photographerDetail.description}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PortfolioForms;
