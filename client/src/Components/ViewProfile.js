import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const ViewProfile = () => {
  const {currentUser} = useContext(UserContext)
 const[loading, setloading] = useState(false)

  return (
    <div className="d-flex justify-content-center mt-5" style={{ minHeight: '65vh' }}>
      <div className="text-center">
        <h3>View Profile</h3>

        {loading ? (
          <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        ) : currentUser ? (
          <>
            <div className="mb-3">
              <button type="button" className={`btn ${currentUser.user_type === 'host' ? 'btn-primary' : 'btn-secondary'}`}>
                {currentUser.user_type.charAt(0).toUpperCase() + currentUser.user_type.slice(1)}
              </button>
            </div>

            <div className="mb-3">
              <label htmlFor="fullName" className="form-label text-start">Full Name:</label>
              <input 
                type="text"
                className="form-control"
                id="fullName"
                value={currentUser.name}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-start">Email:</label>
              <input type="email" className="form-control" id="email" value={currentUser.email} disabled />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label text-start">Phone:</label>
              <input type="text" className="form-control" id="phone" value={currentUser.phone} disabled />
            </div>

            <div className="mb-3 text-center">
              <label htmlFor="phone" className="form-label ">
              <div class="alert alert-danger" role="alert">
                CAUTION deleting the account is irreversible !
               </div>
              </label>
              <input type="text" className="form-control bg-danger text-center text-bark fs-6 fw-semibold" id="phone" value="Delete Account" disabled />
            </div>
          </>
        ) : (
          <div class="alert alert-warning" role="alert">
            Could Not get your profile
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
