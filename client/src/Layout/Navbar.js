import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import logo from '../logo.png'
import '../App.css'

export default function Navbar() {
  const { loggedIn, logout, userType } = useContext(UserContext);

  return (
    <div className='px-4'>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div id='logo' className=''>
            <img src={logo} alt='logo' />
            <Link className="navbar-brand" to={loggedIn ? "/admin" : "/"}>BNB</Link>

          </div >
          
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
                  userType === 'Host' ? (
                    <>
                      <NavLink className="nav-link active" to="/">Home</NavLink>
                      <NavLink className="nav-link active" aria-current="page" to="/add_property">Add Property</NavLink>
                      <NavLink className="nav-link active" aria-current="page" to="/my_property">My Property</NavLink>
                      <NavLink className="nav-link active" to="/profile">Profile</NavLink>
                      <Link>
                        <button className='btn btn-primary' onClick={logout}>Logout</button>
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* <NavLink className="nav-link active" to="/admin">Admin</NavLink> */}
                      <NavLink className="nav-link active" to="/">Home</NavLink>
                      <NavLink className="nav-link active" to="/profile">Profile</NavLink>
                      <Link>
                        <button className='btn btn-primary' onClick={logout}>Logout</button>
                      </Link>
                    </>
                  )
                )}

            </div>
          </div>
        </div>
      </nav>

    </div>
  );
}
