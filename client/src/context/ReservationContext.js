import React, { useEffect, useState, createContext } from 'react';

export const ReservationContext = createContext();

export default function ReservationProvider({ children }) {
  const RESERVATION_API_URL = '/reservations';
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch(RESERVATION_API_URL)
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error('Error fetching reservations:', error));
  }, []);

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
        navigate('/reservations');

        setReservations((prevReservations) => [...prevReservations, response.data]);
      })
      .catch((error) => {
        console.error('Error adding reservation:', error);
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
          navigate('/reservations');

          setReservations((prevReservations) =>
            prevReservations.filter((reservation) => reservation.id !== id)
          );
        } else if (response.error) {
          console.error('Error deleting reservation:', response.error);
        } else {
          console.error('Something went wrong while deleting the reservation.');
        }

        setOnchange(!onchange);
      })
      .catch((error) => {
        console.error('Error deleting reservation:', error);
      });
  };

  const contextData = {
    reservations,
    addReservation,
    deleteReservation,
  };

  return (
    <ReservationContext.Provider value={contextData}>
      {children}
    </ReservationContext.Provider>
  );
}
