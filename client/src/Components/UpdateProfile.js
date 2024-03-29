import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';

const UpdateProfile = () => {
  const { currentUser, updateCurrentuserDetails } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Check if any of the fields is empty, and replace them with values from currentUser
    const updatedName = name !== "" ? name : currentUser.name;
    const updatedEmail = email !== "" ? email : currentUser.email;
    const updatedPhone = phone !== "" ? phone : currentUser.phone;

    if (updatedPhone !== "") {
      if (!validatePhoneNumber(updatedPhone)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please enter a valid phone number",
        });
        return;
      }
    }

    updateCurrentuserDetails(updatedName, updatedEmail, updatedPhone);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Profile updated successfully",
    });

    // Clear input fields after successful update
    setName("");
    setEmail("");
    setPhone("");
  }

  function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

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
