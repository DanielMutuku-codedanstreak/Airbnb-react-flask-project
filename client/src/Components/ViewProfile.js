import React, { useState, useEffect } from 'react';

const ViewProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    //fetch user profile data
    fetch('')
      .then((response) => response.json())
      .then((data) => setUserProfile(data))
      .catch((error) => console.error('Error fetching user profile:', error));
  }, []);

  return (
    <div className="d-flex justify-content-center mt-5" style={{ minHeight: '65vh' }}>
      <div className="text-center">
        <h3>View Profile</h3>
        
        {userProfile ? (
          <>
            <div className="mb-3">
              <img
                src={userProfile.profilePhoto}
                alt="Profile"
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <br />
              <span className="badge bg-primary">{userProfile.userType}</span>
            </div>
            
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name:</label>
              <input type="text" className="form-control" id="fullName" value={userProfile.fullName} disabled />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" className="form-control" id="email" value={userProfile.email} disabled />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input type="text" className="form-control" id="phone" value={userProfile.phone} disabled />
            </div>
          </>
        ) : (
          <p>Loading user profile...</p>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
