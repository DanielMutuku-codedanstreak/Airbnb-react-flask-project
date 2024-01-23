import React, { useEffect, useState } from 'react'
import AllListing from '../Components/AllListing'
import { Link, useNavigate } from 'react-router-dom'
import AdminHeader from '../Components/AdminHeader'

export default function ViewAllListing(props) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const listingsPerPage = 6
    const [currentPage, setCurrentPage] = useState(1)
    //pagination
    const indexOfLastListing = currentPage * listingsPerPage
    const indexOfFirstListing = indexOfLastListing - listingsPerPage
    const currentListings = props.allListings.slice(indexOfFirstListing, indexOfLastListing)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    //function to fetch our listings
    useEffect(() => {
        if (props.isLoggedIn) {
          fetch(props.API_URL)
          .then((res) => res.json())
          .then((data) => {
            props.setAllListings(data);
            setLoading(false);
          })
          .catch((error) => console.log(`Error fetching listings data, ${error}`));
        }else{
            navigate('/');
        }
    }, [props.API_URL, props.isLoggedIn,navigate]);
    //
    const list = currentListings.map((listing, index) => {
        return(
            //console.log(listing)
            <Link key={listing.id} className='col-md-4' to={`/admin/viewall/${listing.id}`}>
                <AllListing  listing={listing}></AllListing>
            </Link>
        )
    })

  return (
    <div className='container'>
        <AdminHeader></AdminHeader>
        <div className='row'>
            {loading ? (
                <p>Loading...</p>
            ) : props.allListings.length === 0 ? (
                <p className='alert alert-warning'>Airbnb listings not available</p>
            ) : (
                list
            )}
        </div>
        <div>
          {Array.from({ length: Math.ceil(props.allListings.length / listingsPerPage) }, (_, index) => (
            <button className='btn' key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
  </div>
  )
}
