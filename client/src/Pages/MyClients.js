import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const MyClients = () => {
  const [clients, setClients] = useState([]);
  const { id } = useParams();
  const authToken = sessionStorage.getItem('authToken');

  // Fetch my clients
  useEffect(() => {
    fetch(`/clients/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken && authToken}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setClients(response);
        console.log(response);
      });
  }, []);

  console.log(clients);

  return (
    <div className='container'>
      <h2>My Clients</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>From</th>
            <th>To</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client, index) => (
              <tr key={client.phone}>
                <td>{index + 1}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.from}</td>
                <td>{client.to}</td>
                <td>{client.total.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className='alert alert-warning'>No clients</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyClients;
