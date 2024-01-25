import React, { useState, useEffect } from 'react';

const ViewProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/users/51') 
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      });
  }, []);

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
        ) : userProfile ? (
          <>
            <div className="mb-3">
              <button type="button" className={`btn ${userProfile.user_type === 'host' ? 'btn-primary' : 'btn-secondary'}`}>
                {userProfile.user_type.charAt(0).toUpperCase() + userProfile.user_type.slice(1)}
              </button>
            </div>

            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name:</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value={userProfile.name}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" className="form-control" id="email" value={userProfile.email} disabled />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input type="text" className="form-control" id="phone" value={userProfile.phone} disabled />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label ">
              <div class="alert alert-danger" role="alert">
                CAUTION deleting the account is erreversible !
               </div>
              </label>
              <input type="text" className="form-control bg-danger text center text-bark fs-6 fw-semibold" id="phone" value="Delete Account" disabled />
            </div>
          </>
        ) : (
          <div class="text-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
