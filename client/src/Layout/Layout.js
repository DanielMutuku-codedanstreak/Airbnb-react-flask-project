import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout(props) {
  return (
    <div>
        <Navbar isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn}></Navbar>
        <div id='main-container'>
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}
