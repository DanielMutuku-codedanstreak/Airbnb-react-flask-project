import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    //fetch clients data
    fetch('')
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error('Error fetching clients:', error));
  }, []);

  return (
    <div>
      <h2>My Clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id} className="mb-4">
            <Link to={`/viewall/${client.property.id}`}>
              <div>
                <h4>{client.name}</h4>
                <p>Email: {client.email}</p>
                <p>Phone: {client.phone}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyClients;
