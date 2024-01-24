import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Navbar() {
  const { loggedIn, logout } = useContext(UserContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={loggedIn ? "/admin" : "/"}>AIRBNB</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              {loggedIn === false ? (
                <>
                  <NavLink className="nav-link active" to="/">Home</NavLink>
                  <NavLink className="nav-link active" to="/login">Login</NavLink>
                  <NavLink className="nav-link active" to="/register">Register</NavLink>
                </>
              ) : (
                <>
                  <NavLink className="nav-link active" to="/admin">Admin</NavLink>
                  <NavLink className="nav-link active" to="/admin/viewall">View All</NavLink>
                  <NavLink className="nav-link active" to="/profile">Profile</NavLink>
                  <Link>
                    <button className='btn btn-primary' onClick={logout}>Logout</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
