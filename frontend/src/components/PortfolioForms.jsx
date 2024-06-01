import React from 'react';

const PortfolioForms = ({ photographerDetail }) => {
  return (
    <>
      <table className="table mb-5" style={{ backgroundColor: '#E4DFD9' }}>
        <thead>
          <tr>
            {/* <th scope="col">Profile pic</th> */}
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td>
              <img
                src={photographerDetail.profilePic}
                className="img-thumbnail"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                }}
                alt="profile picture"
              />
            </td> */}
            <td>{photographerDetail.description}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PortfolioForms;
