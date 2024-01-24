import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New Password and Confirm Password do not match');
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await fetch('/api/change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.success);
        setError(null);

        navigate('/login');
      } else {
        setError('Failed to change password. Please check your details.');
        setSuccessMessage(null);
      }
    } catch (error) {
      setError('Failed to change password. Please try again later.');
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input type="password" className="form-control" name='newPassword' onChange={handleChange} value={formData.newPassword} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='confirmPassword' onChange={handleChange} value={formData.confirmPassword} required />
        </div>
        <button type="submit" className="btn btn-primary">Reset Password</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default ResetPassword;
