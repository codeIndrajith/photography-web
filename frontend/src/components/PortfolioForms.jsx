import React from 'react';

const PortfolioForms = ({ photographerDetail, userInfo }) => {
  return (
    <>
      <table className="table table-striped table-bordered mb-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userInfo.name}</td>
            <td>{photographerDetail.description}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PortfolioForms;
