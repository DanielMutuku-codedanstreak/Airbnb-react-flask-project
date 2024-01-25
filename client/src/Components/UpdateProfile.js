import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const UpdateProfile = () => {
  const [updatedDetails, setUpdatedDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetch('/users/51')
      .then((response) => response.json())
      .then((data) => {
        setUpdatedDetails({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleChange = (e) => {
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/users/51', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from server:', data);

        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: 'User updated successfully',
          });

          
        } else {
        
          Swal.fire({
            icon: 'error',
            title: 'Error updating user',
            text: data.error || 'Failed to update user',
          });
        }
      })
      .catch((error) => {
        console.error('Error updating user profile:', error);
        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update user',
        });
      });
  };

  return (
    <div className="d-flex justify-content-center mt-5" style={{ minHeight: '65vh' }}>
      <div>
        <h3 className="text-center">Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className="form-control" name="name" onChange={handleChange} value={updatedDetails.name} />
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
