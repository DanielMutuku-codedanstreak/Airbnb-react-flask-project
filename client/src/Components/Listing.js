import React from 'react'

export default function Listing() {
     const {title,category,image,price,bathrooms,beds,capacity, location} = props.listing
  return (
    <div id='listing'>
        <div className='listing-card card bg-light mb-3'>
            <img src={image} alt='Airbnb Loading...' className='img-fluid' style={{height:250}}></img>
            <h3 className='px-3'>{title}</h3>
            <div className='d-flex gap-5 px-3 mb-3'>
                <div className='d-flex flex-column'>
                    <span><i className="fa fa-user" aria-hidden="true"></i> {capacity} Guests</span>
                    <span><i className="fa fa-codepen" aria-hidden="true"></i> {category}</span>
                </div>
                <div className='d-flex flex-column'>
                    <span><i className="fa fa-bath" aria-hidden="true"></i> {bathrooms} Bathrooms</span>
                    <span><i className="fa fa-bed" aria-hidden="true"></i> {beds} Beds</span>
                </div>
            </div>
            <div className='d-flex flex-row gap-5 px-3'>
                <p><b>$ {price}</b>/Night</p>
                <p className='ms-4'><i className="fa fa-map-marker" aria-hidden="true"></i> {location}</p>  
            </div>
        </div>
    </div>
  )
}
