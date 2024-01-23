import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AddListing from '../Components/AddListing'
import AdminHeader from '../Components/AdminHeader'

export default function Admin(props) {
    const navigate = useNavigate()
    useEffect(() => {
        if (!props.isLoggedIn) {
            navigate('/');
        }
    }, [props.isLoggedIn, navigate])

  return (
    <div>
        <AdminHeader></AdminHeader>
        <AddListing API_URL={props.API_URL}></AddListing>
    </div>
  )
}
