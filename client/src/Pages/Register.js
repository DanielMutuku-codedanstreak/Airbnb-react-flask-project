import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';

export default function Register() {
  const {registerUser} = useContext(UserContext)

  const [name, setName] = useState('');
  const [userType, setUserType] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    
    if (password !== confirmPassword){
      
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Please enter matching passwords",
     });

    }else if (!validatePhoneNumber(phone)){
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Please enter a valid phone number",
     });

    }else{
      registerUser(name,email ,phone,password, userType)

      setName("")
      setEmail("")
      setPassword("")
      setPhone("")
      setConfirmPassword("")
      
    }
  }
  function validatePhoneNumber(phone) {
    // Define a regular expression pattern for a simple phone number validation
    const phoneRegex = /^\d{10}$/;
 
    // Test the phone number against the regular expression
    return phoneRegex.test(phone);
 }



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
              <input required type="text" className="form-control"  onChange={(e)=> setName(e.target.value)} value={name} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input required type="email" className="form-control"onChange={(e)=> setEmail(e.target.value)} value={email}  />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone number</label>
              <input required type="text" className="form-control" onChange={(e)=> setPhone(e.target.value)} value={phone} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input required type="password" className="form-control" onChange={(e)=> setPassword(e.target.value)} value={password} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
              <input required type="password" className="form-control" onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword}  />
            </div>
            <div className="mb-3">
              <label>User Type:</label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="userType"
                  value="host"
                  // checked={setUserType("host")}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label className="form-check-label">Host</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="userType"
                  value="guest"
                  // checked={formData.userType === 'guest'}
                  onChange={(e) => setUserType(e.target.value)}
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

  // const [formData, setFormData] = useState({
  //   fullname: '',
  //   email: '',
  //   phone: '',
  //   password: '',
  //   confirmPassword: '',
  //   userType: ''
  // });

  // //handle change of input data
  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // //handle radio button change
  // const handleRadioChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     userType: e.target.value
  //   });
  // };

  // //handle form submit
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   //perform registration logic here

  //   //redirect to login page after successful registration
  //   navigate('/login');
  // };

