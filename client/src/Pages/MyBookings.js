import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('/reservations')
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error('Error fetching bookings:', error));
  }, []);

  const handleDelete = (reservationId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/reservations/${reservationId}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Response from server:', data);
            setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== reservationId));
          })
          .catch((error) => {
            console.error('Error deleting booking:', error);
          });

        Swal.fire('Cancelled!', 'Your reservation has been cancelled.', 'success');
      }
    });
  };

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking.id} className="mb-4">
              <div>
                <img
                  src={booking.property.photo || booking.property.image || ''} // Adjust property photo property
                  alt={booking.property.name || ''} // Adjust property name property
                  style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                />
                <div className="ml-3">
                  <h4>{booking.property.name || ''}</h4>
                  <p>{booking.property.location || ''}</p>
                  <p>Check-in: {booking.from || ''}</p>
                  <p>Check-out: {booking.to || ''}</p>
                  <p>Total: {booking.total || ''}</p>
                  <p>Number of Guests: {booking.number_of_guests || ''}</p>
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => handleDelete(booking.id)}>
                Cancel Reservation
              </button>
            </li>
          ))
        ) : (
          <p>No bookings available</p>
        )}
      </ul>
      <Link to="/profile">
        <button className="btn btn-primary">Back to Profile</button>
      </Link>
    </div>
  );
};

export default MyBookings;
