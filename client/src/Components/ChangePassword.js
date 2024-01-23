import React, { useState } from 'react';

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //logic to change password
  };

  return (
    <div className="d-flex justify-content-center mt-5" style={{ minHeight: '65vh' }}>
      <div>
        <h3 className="text-center">Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">Current Password:</label>
            <input type="password" className="form-control" name="currentPassword" onChange={handleChange} value={passwordData.currentPassword} />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password:</label>
            <input type="password" className="form-control" name="newPassword" onChange={handleChange} value={passwordData.newPassword} />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
            <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} value={passwordData.confirmPassword} />
          </div>
          <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
