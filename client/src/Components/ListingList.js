import React, { useContext, useState } from 'react';
import Listing from './Listing';
import { Link } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';

export default function ListingList() {
  const { allListings, searchError } = useContext(PropertyContext);
  const listingsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = allListings.slice(indexOfFirstListing, indexOfLastListing);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const list = currentListings.map((listing) => (
    <Link key={listing.id} className="col-md-4" to={`/airbnb/${listing.id}`}>
      <Listing listing={listing} />
    </Link>
  ));

  return (
    <div className="container">
      {searchError && <p className="alert alert-warning">{searchError}</p>}
      <div className="row">
        {allListings ? (
          allListings.length === 0 ? (
            <p className="alert alert-warning">Airbnb listings not available</p>
          ) : (
            list
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div>
        {Array.from({ length: Math.ceil(allListings.length / listingsPerPage) }, (_, index) => (
          <button className="btn" key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}