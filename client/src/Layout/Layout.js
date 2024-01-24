import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import '../App.css'

export default function Layout(props) {
  return (
    <div>
        <Navbar isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn}></Navbar>
        <div id='main-container' className='py-2'>
            <Outlet/>
        </div>
        <Footer></Footer>
    </div>
  )
}
