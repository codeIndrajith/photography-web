import React from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useDeletePortfolioMutation } from '../slices/photographerApiSlices';
import { toast } from 'react-toastify';

const PortfolioForms = ({ photographerDetail, userInfo, refetch }) => {
  const [deletePortfolio, { isLoading }] = useDeletePortfolioMutation();
  const deleteHandler = async () => {
    try {
      const res = await deletePortfolio(photographerDetail._id).unwrap();
      refetch();
      toast.success('Portfolio delete success');
    } catch (error) {
      console.log(error);
    }
  };
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
            <td>
              {userInfo.name || userInfo.firstName + ' ' + userInfo.lastName}
            </td>
            <td>{photographerDetail.description}</td>
            <td onClick={deleteHandler}>
              <MdOutlineDeleteOutline
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

export default PortfolioForms;
