import React, { useState } from 'react'
import Listing from './Listing';
import { Link } from 'react-router-dom';

export default function ListingList(props) {
    const listingsPerPage = 6
    const [currentPage, setCurrentPage] = useState(1)
    const filteredListings = props.listings.filter((listing) => {
        return(
          listing.title.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
          listing.category.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
          listing.location.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
          listing.host.name.toLowerCase().includes(props.searchTerm.toLowerCase())
        )
    })
    //pagination
    const indexOfLastListing = currentPage * listingsPerPage
    const indexOfFirstListing = indexOfLastListing - listingsPerPage
    const currentListings = filteredListings.slice(indexOfFirstListing, indexOfLastListing)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const list = currentListings.map((listing, index) => {
        return(
            //console.log(listing)
            <Link key={listing.id} className='col-md-4' to={`/airbnb/${listing.id}`}>
                    <Listing  listing={listing}></Listing>
            </Link>
        )
    });
    
  return (
    <div className='container'>
        <div className='row'>
            {
                props.listings ? (
                    props.listings.length === 0 ? (
                        <p className='alert alert-warning'>Airbnb listings not available</p>
                    ) : (
                        list
                    )
                ) : (
                    <div>
                        Loading...
                    </div>
                )
            } 
        </div>
        <div>
            {Array.from({ length: Math.ceil(props.listings.length / listingsPerPage) }, (_, index) => (
                <button className='btn' key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
                </button>
            ))}
        </div>
    </div>
  )
}
