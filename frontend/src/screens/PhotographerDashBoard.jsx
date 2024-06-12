import React, { useState } from 'react';
import './CSS/LocationOwnerDashBoard.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import {
  useAddPortfolioLMutation,
  useGetPortfolioQuery,
} from '../slices/photographerApiSlices';
import PortfolioForms from '../components/PortfolioForms';

import { Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const PhotographerDashBoard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isDisable, setIsDisable] = useState(false);
  const {
    data: getPhotographerDetails,
    isLoading,
    error,
    refetch,
  } = useGetPortfolioQuery(userInfo._id);

  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');

  const [photographerDetails, { isLoading: loadingPhotographerDetails }] =
    useAddPortfolioLMutation();

  const fileHandler = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);
    setFiles(selectedFiles);

    // Disable the file input if 5 images are already selected
    if (selectedFiles.length >= 5) {
      e.target.disabled = true;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('photographerId', userInfo._id);
      files.forEach((file, index) => {
        formData.append(`shootImageSamples`, file);
      });

      const res = await photographerDetails(formData).unwrap();
      toast.success('Photographer details add success');
      setDescription('');
      refetch();
    } catch (error) {
      toast.error('Not add details');
    }
  };

  return (
    <>
      <div className="container-fluid mt-5 p-5">
        <div className="contentSection">
          <h1 className="mb-5">My Details</h1>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="d-flex align-items-center dropdownBtn"
            >
              <FaUserCircle
                className="fa-circle"
                style={{ marginRight: '8px' }}
              />
              <span>
                {userInfo.name || userInfo.firstName + ' ' + userInfo.lastName}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>{userInfo.email}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          {!getPhotographerDetails && (
            <form onSubmit={submitHandler}>
              <div className="form-group row mt-3">
                <label className="col-sm-2 col-form-label">Add Photos</label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    onChange={fileHandler}
                    placeholder="Portfolio"
                    disabled={isDisable}
                  />
                </div>
              </div>
              <div className="form-group row mt-3">
                <label className="col-sm-2 col-form-label">
                  Tell About you
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell about you"
                    disabled={isDisable}
                  />
                </div>
              </div>
              <button className="addBtn" type="submit" disabled={isDisable}>
                Add
              </button>
              {loadingPhotographerDetails && <Loader />}
            </form>
          )}
        </div>

        {/* Input details */}
        <div className="mt-5 p-3">
          <div>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <NotFound />
            ) : (
              <>
                {getPhotographerDetails.map((photographerDetail) => (
                  <PortfolioForms
                    key={photographerDetail._id}
                    photographerDetail={photographerDetail}
                    userInfo={userInfo}
                    refetch={refetch}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotographerDashBoard;
