import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import '../App.css'

export default function Layout() {
  return (
    <div>
        <Navbar />
        <div id='main-container' className='py-2'>
            <Outlet/>
        </div>
        <Footer />
    </div>
  )
}
