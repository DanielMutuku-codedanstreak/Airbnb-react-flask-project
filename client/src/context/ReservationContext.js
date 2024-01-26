import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ReservationContext = createContext();

export default function ReservationProvider({ children }) {
  const RESERVATION_API_URL = '/reservations';
  const [reservations, setReservations] = useState([]);
  const  navigate = useNavigate();
  const authToken = sessionStorage.getItem('authToken');
  const [bookings, setBookings] = useState([]);
  const [onChange, setOnChange] = useState(false)
  const [clients, setClients] = useState([]);

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
  
    if (!authToken) {
      // Handle the case where authToken is not available, maybe redirect to login
      // Example: navigate('/login');
      return;
    }
  
    fetch(`${RESERVATION_API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to cancel reservation - ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
        if (response.success) {
          setOnChange(!onChange);
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: response.success,
            showConfirmButton: false,
            timer: 1500,
          });
          // Navigate to a different page if needed
          // Example: navigate('/success');
        } else {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Failed',
            text: response.error || 'Unknown error',
          });
        }
      })
      .catch((error) => {
        console.error('Error cancelling reservation:', error);
  
        Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
      });
  };
  



    

  

  const contextData = {
    reservations,
    addReservation,
    deleteReservation,
    // fetchReservations, // Added a function for explicit fetching
    bookings,setBookings,
    // clients
  };

  return (
    <ReservationContext.Provider value={contextData}>
      {children}
    </ReservationContext.Provider>
  );
}