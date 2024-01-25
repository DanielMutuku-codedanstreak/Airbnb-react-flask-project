import React, { useContext } from 'react';
import { PropertyContext } from '../context/PropertyContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function MyPropertyList() {
  const { hostListings, deleteProperty } = useContext(PropertyContext);

  const handleDeleteProperty = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        deleteProperty(id);
      }
    });
  };

  // Check if hostListings is not an array
  if (!Array.isArray(hostListings)) {
    return <div className='alert alert-warning'>No properties found for this host.</div>;
  }

  return (
    <div className='container mx-auto'>
        <h2>My Properties</h2>
        <div className="d-flex flex-wrap">
            {hostListings.map(property => (
            <div key={property.id} className="card m-2" style={{ width: '300px' }}>
                <img src={property.image} className="card-img-top" alt={property.title} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">{property.location}</p>
                    <div className="d-flex justify-content-between">
                    <Link to={`/update-property/${property.id}`} className="btn btn-primary">Update</Link>
                    <button className="btn btn-danger" onClick={() => handleDeleteProperty(property.id)}>Delete</button>
                    <Link to={`/my_clients/${property.id}`} className="btn btn-success">My Clients</Link>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
}
