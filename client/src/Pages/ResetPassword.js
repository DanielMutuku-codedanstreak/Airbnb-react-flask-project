import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';


import { UserContext } from '../context/UserContext';

const ResetPassword = () => {

  const{resetPassword} = useContext(UserContext)
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')



  function handleSubmit(e){
    e.preventDefault();

    if (password !== confirmPassword){
      Swal.fire({
        icon: "error",
        position: "top",
        title: "error",
        text: "Please enter matching passwords",
     });
    }else{
      resetPassword(name, email, password)
    }

    
  };

  return (
    <div className='container'>
      <div className='row d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}>
        <div className='col-md-6'>
          <form className='bg-secondary bg-opacity-25 p-4' style={{ borderRadius: '10px' }} onSubmit={handleSubmit}>
            <div>
              <h2 className='text-center'>Reset Password</h2>
            </div>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">Full name</label>
              <input required type="text" className="form-control"  onChange={(e)=> setName(e.target.value)} value={name} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input required type="email" className="form-control"onChange={(e)=> setEmail(e.target.value)} value={email}  />
            </div>
           
            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input required type="password" className="form-control" onChange={(e)=> setPassword(e.target.value)} value={password} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
              <input required type="password" className="form-control" onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword}  />
            </div>
           
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
