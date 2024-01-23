import React, { useState } from 'react';

const UpdateProfile = () => {
  const [updatedDetails, setUpdatedDetails] = useState({
    profilePhoto: null,
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      //handle profile photo upload
      setUpdatedDetails({
        ...updatedDetails,
        profilePhoto: e.target.files[0],
      });
    } else {
      //handle text inputs(email and phone)
      setUpdatedDetails({
        ...updatedDetails,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //logic to update details
    console.log('Updated Details:', updatedDetails);
  };

  return (
    <div className="d-flex justify-content-center mt-5" style={{ minHeight: '65vh' }}>
      <div>
        <h3 className="text-center">Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="profilePhoto" className="form-label">Profile Photo:</label>
            <input type="file" className="form-control" name="profilePhoto" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" name="email" onChange={handleChange} value={updatedDetails.email} />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone:</label>
            <input type="text" className="form-control" name="phone" onChange={handleChange} value={updatedDetails.phone} />
          </div>

          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
