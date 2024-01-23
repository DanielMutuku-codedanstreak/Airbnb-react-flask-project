import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: ''
  });

  //handle change of input data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //handle radio button change
  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      userType: e.target.value
    });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //perform registration logic here

    //redirect to login page after successful registration
    navigate('/login');
  };

  return (
    <div className='container'>
      <div className='row d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}>
        <div className='col-md-6'>
          <form className='bg-secondary bg-opacity-25 p-4' style={{ borderRadius: '10px' }} onSubmit={handleSubmit}>
            <div>
              <h2 className='text-center'>Register</h2>
            </div>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">Full name</label>
              <input type="text" className="form-control" name='fullname' onChange={handleChange} value={formData.fullname} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' onChange={handleChange} value={formData.email} required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone number</label>
              <input type="text" className="form-control" name='phone' onChange={handleChange} value={formData.phone} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' onChange={handleChange} value={formData.password} required />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
              <input type="password" className="form-control" name='confirmPassword' onChange={handleChange} value={formData.confirmPassword} required />
            </div>
            <div className="mb-3">
              <label>User Type:</label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="userType"
                  value="host"
                  checked={formData.userType === 'host'}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label">Host</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="userType"
                  value="guest"
                  checked={formData.userType === 'guest'}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label">Guest</label>
              </div>
            </div>
            <div className='mb-3'>
              <p>Already have an account? <Link to='/login'>Login here</Link></p>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
