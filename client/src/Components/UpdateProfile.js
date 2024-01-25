import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';

const UpdateProfile = () => {

  const {currentUser, updateCurrentuserDetails} = useContext(UserContext)
 const[name,setName] = useState("")
 const[email,setEmail] = useState("")
 const[phone,setPhone] = useState("")

 function handleSubmit(e){
  e.preventDefault()
  if (phone !== ""){
    if (!validatePhoneNumber(phone)){
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Please enter a valid phone number",
     });

  }
   
  }else{
    
    updateCurrentuserDetails(name,email ,phone)

    setName("")
    setEmail("")
    
    setPhone('')
   
    
  }
}
function validatePhoneNumber(phone) {
  // Define a regular expression pattern for a simple phone number validation
  const phoneRegex = /^\d{10}$/;

  // Test the phone number against the regular expression
  return phoneRegex.test(phone);
}





  // const [updatedDetails, setUpdatedDetails] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  // });

  // useEffect(() => {
  //   fetch('/users/51')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUpdatedDetails({
  //         name: data.name,
  //         email: data.email,
  //         phone: data.phone,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user profile:', error);
  //     });
  // }, []);

  // const handleChange = (e) => {
  //   setUpdatedDetails((prevDetails) => ({
  //     ...prevDetails,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   fetch('/users/51', {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedDetails),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Response from server:', data);

  //       if (data.success) {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'User updated successfully',
  //         });

          
  //       } else {
        
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error updating user',
  //           text: data.error || 'Failed to update user',
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error updating user profile:', error);
        
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'Failed to update user',
  //       });
  //     });
  // };

  return (
    <div className="d-flex justify-content-center mt-5" style={{ minHeight: '65vh' }}>
      <div>
        <h3 className="text-center">Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className="form-control" name="name" placeholder={currentUser.name} onChange={(e) => setName(e.target.value)} value={name} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" name="email" placeholder={currentUser.email} onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone:</label>
            <input type="text" className="form-control" name="phone" placeholder={currentUser.phone} onChange={(e) => setPhone(e.target.value)} value={phone} />
          </div>

          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
