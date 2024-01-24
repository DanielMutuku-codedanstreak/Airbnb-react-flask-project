import React from 'react'
import ListingList from './ListingList'
import UtilityBar from './UtilityBar'
import { useState } from 'react'

export default function Landing() {     
  return (
    <div>
      <div className="jumbotron text-center">
        <h1 className="display-4">Welcome to AirBnb Listings</h1>
        <p className="lead">Explore and book unique homes and experiences around the world.</p>
      </div>
      <UtilityBar />
      <ListingList />
    </div>
  )
}
