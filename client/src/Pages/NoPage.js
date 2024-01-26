import React from 'react';
import { Link } from 'react-router-dom';

export default function NoPage() {
  return (
    <div className='container d-flex align-items-center justify-content-center vh-100'>
      <div className='text-center'>
        <h2 className='text-primary'>404 Error</h2>
        <h1 className='display-1'>Page not found</h1>
        <p className='lead'>
          Sorry, the page you are looking for could not be found or has been
          <br />
          removed.
        </p>
        <Link to={'/'}>
          <button className='btn btn-primary'>Go Home</button>
        </Link>
      </div>
    </div>
  );
}
