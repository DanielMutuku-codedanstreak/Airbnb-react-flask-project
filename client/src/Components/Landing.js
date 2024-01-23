import React, { useEffect, useState } from 'react'
import ListingList from './ListingList'
import UtilityBar from './UtilityBar'

export default function Landing(props) {
  const [listings, setListings]=useState([])
  const [searchTerm, setSearchTerm] = useState('')
  //function to search
  const handleSearch = (searchTerm)=>{
    //console.log(searchTerm)
    setSearchTerm(searchTerm); // Update the search term state
    const filtered = listings.filter((listing) => {
      return(
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.host.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    //console.log(filtered)
    setListings(filtered)
  }
  //function to fetch our listings
  useEffect(()=>{
    fetch(props.API_URL)
    .then(res=> res.json())
    .then(data => setListings(data))
    .catch(error => console.log(`Error fetching listings data, ${error}`))
  },[props.API_URL,searchTerm]) 
  return (
    <div>
      <div className="jumbotron text-center">
        <h1 className="display-4">Welcome to AirBnb Listings</h1>
        <p className="lead">Explore and book unique homes and experiences around the world.</p>
      </div>
      <UtilityBar listings={listings} setListings={setListings} handleSearch={handleSearch}></UtilityBar>
      <ListingList listings={listings} searchTerm={searchTerm}></ListingList>
    </div>
  )
}
