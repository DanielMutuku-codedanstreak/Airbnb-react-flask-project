import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const ReservationContext = createContext();

export default function ReservationProvider({ children }) {
  const RESERVATION_API_URL = '/reservations';
  const [reservations, setReservations] = useState([]);
  const  navigate = useNavigate();
  const authToken = sessionStorage.getItem('authToken');
  const [bookings, setBookings] = useState([]);
  const [onChange, setOnChange] = useState(false)

  useEffect(() => {
    
    fetch(RESERVATION_API_URL,{
      headers: {
        "Authorization": `Bearer ${authToken && authToken}`

    
    }})
  
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error('Error fetching reservations:', error));
  
}, [onChange]);

  const addReservation = (formData) => {
    const authToken = sessionStorage.getItem('authToken');

    fetch(RESERVATION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken && authToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setOnChange(!onChange)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.success,
            showConfirmButton: false,
            timer: 1500
            });
            navigate('/mybookings')
        } else if (response.error) {
          Swal.fire({
            icon: "error",
            title: 'error',
            text: response.error,
         });
        } 
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error,
          text: "Something went wrong!",
       });
      });
  };


  const deleteReservation = (id) => {
    const authToken = sessionStorage.getItem('authToken');

    fetch(`${RESERVATION_API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken && authToken}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          // navigate('/reservations');
          setOnChange(!onChange)
          setReservations((prevReservations) =>
            prevReservations.filter((reservation) => reservation.id !== id)
          );
        } else if (response.error) {
          console.error('Error deleting reservation:', response.error);
        } else {
          console.error('Something went wrong while deleting the reservation.');
        }
      })
      .catch((error) => {
        console.error('Error deleting reservation:', error);
      });
  };

  const contextData = {
    reservations,
    addReservation,
    deleteReservation,
    // fetchReservations, // Added a function for explicit fetching
    bookings,setBookings
  };

  return (
    <ReservationContext.Provider value={contextData}>
      {children}
    </ReservationContext.Provider>
  );
}