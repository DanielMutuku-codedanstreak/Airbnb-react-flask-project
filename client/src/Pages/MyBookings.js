import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ReservationContext } from '../context/ReservationContext';

const MyBookings = () => {
  const { bookings, setBookings, deleteReservation } = useContext(ReservationContext);

  const handleDelete = (reservationId) => {
    deleteReservation(reservationId);
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'This action cannot be undone!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, cancel it!',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     fetch(`/reservations/${reservationId}`, {
    //       method: 'DELETE',
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log('Response from server:', data);
    //         setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== reservationId));
    //       })
    //       .catch((error) => {
    //         console.error('Error deleting booking:', error);
    //       });

    //     Swal.fire('Cancelled!', 'Your reservation has been cancelled.', 'success');
    //   }
    // });
  };

  return (
    <div className='container mx-auto'>
      <h2>My Bookings</h2>
      <div className="row">
        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="col-md-3 mb-4">
              <div className="card rounded-3" style={{ width: '100%', padding: '15px' }}>
                <div className="card-body">
                  <h5 className="card-title"> {booking.property || ''}</h5>
                  <p className="card-text">Location: {booking.location || ''}</p>
                  <p className="card-text">From: {booking.from || ''}</p>
                  <p className="card-text">To: {booking.to || ''}</p>
                  <p className="card-text">Total: {booking.total.toLocaleString() || ''}</p>
                  <p className="card-text">Number of Guests: {booking.number_of_guests || ''}</p>
                  <button className="btn btn-danger" onClick={() => handleDelete(booking.id)}>
                    Cancel Reservation
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings available</p>
        )}
      </div>
      <Link to="/profile">
        <button className="btn btn-primary">Back to Profile</button>
      </Link>
    </div>
  );
};

export default MyBookings;
