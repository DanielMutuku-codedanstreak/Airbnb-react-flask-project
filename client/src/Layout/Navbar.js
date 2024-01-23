import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar(props) {
    const navigate = useNavigate()
    //function to handle logout\
    const handleLogout = ()=>{
        props.setIsLoggedIn(false)
        navigate('/')
    }
    
  return (
    <div>
        {
            props.isLoggedIn === false ? (
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">AIRBNB</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ms-auto">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            ) : (
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/admin">AIRBNB</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ms-auto">
                                <NavLink className="nav-link active" aria-current="page" to="/admin">Admin</NavLink>
                                <NavLink className="nav-link active" aria-current="page" to="/admin/viewall">View All</NavLink>
                                <Link>
                                    <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            )
        }
    </div>
  )
}
