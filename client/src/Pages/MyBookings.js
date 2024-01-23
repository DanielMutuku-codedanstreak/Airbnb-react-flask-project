import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    //fetch bookings data
    fetch('')
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error('Error fetching bookings:', error));
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id} className="mb-4">
            <Link to={`/airbnb/${booking.id}`}>
              <img
                src={booking.propertyPhoto}
                alt={booking.propertyName}
                style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
              />
              <div className="ml-3">
                <h4>{booking.propertyName}</h4>
                <p>{booking.propertyLocation}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/profile">
        <button className="btn btn-primary">Back to Profile</button>
      </Link>
    </div>
  );
};

export default MyBookings;
