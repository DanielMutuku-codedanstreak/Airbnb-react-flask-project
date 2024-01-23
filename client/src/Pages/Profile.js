import React, { useState } from 'react';
import UpdateProfile from '../Components/UpdateProfile';
import ChangePassword from '../Components/ChangePassword';
import ViewProfile from '../Components/ViewProfile';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('viewProfile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h2>Profile</h2>
      <div className='d-flex justify-content-center gap-2'>
        <button className='btn' onClick={() => handleTabChange('viewProfile')}>
          View Profile
        </button>
        <button className='btn' onClick={() => handleTabChange('changePassword')}>
          Change Password
        </button>
        <button className='btn' onClick={() => handleTabChange('updateDetails')}>
          Update Details
        </button>
        <Link to={'/mybookings'}>
            <button className='btn'>
                My Bookings
            </button>
        </Link>
      </div>
      <div>
        {activeTab === 'viewProfile' && <ViewProfile />}
        {activeTab === 'changePassword' && <ChangePassword />}
        {activeTab === 'updateDetails' && <UpdateProfile />}
      </div>
    </div>
  );
};

export default Profile;
