import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  //handle change of input data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setIsLoggedIn(true);
    navigate('/admin');
  };

  return (
    <div className='container'>
      <div className='row d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}>
        <div className='col-md-6'>
          <form className='bg-secondary bg-opacity-25 p-4' style={{borderRadius: '15px'}} onSubmit={handleSubmit}>
            <div>
              <h2 className='text-center'>Login</h2>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" aria-describedby="emailHelp" name='email' onChange={handleChange} value={formData.email} required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' onChange={handleChange} value={formData.password} required />
            </div>
            <div className='mb-3'>
              <p>Don't have an account? <Link to='/register'>Register here</Link></p>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
