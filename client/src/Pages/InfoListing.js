import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function InfoListing(props) {
    const params = useParams()
    const navigate = useNavigate()
    const [listing,setListing] = useState(null)
    //function to fetch data of one listing
    useEffect(()=>{
        fetch(`${props.API_URL}/${params.id}`)
        .then(res=> res.json())
        .then(data => setListing(data))
        .catch(error => console.log(error))
    },[props.API_URL, params.id])
    //loading feature as we await listing to load
    if(!listing){
        return <div>
            Loading...
        </div>
    }
    //destructure our listing
    const {title,description,category,image,other_Images,price,inclusives,amenities,rules,bathrooms,beds,capacity, location,host} = listing
    //capture inclusives
    const inclusivesList = inclusives.map((inclusive, index) => {
        return(
            //console.log(inclusive)
            <div key={index} className='card py-3 px-2'>
                {inclusive}
            </div>
        )
    })
    //capture amenities
    const amenitiesList = amenities.map((amenity, index) => {
        return(
            //console.log(amenity)
            <div key={index} className='col-md-6'>
                <li>{amenity}</li>
            </div>
        )
    })
    //cpture other images
    const otherImagesList = other_Images.map((otherImage, index)=>{
        return(
            //console.log(otherImage)
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={otherImage} alt='Airbnb Loading...' className='d-block w-100 rounded'></img>
            </div>
        )
    })
    //function to navigate back
    const goBack =()=>{
        navigate(-1)
    }
    
  return (
    <div className='container'>
        <div className='d-flex flex-column'>
            <div className='row'>
                <div className='col-md-6'>
                    <img src={image} alt='Airbnb Loading...' className='img-fluid rounded'></img>
                </div>
                <div className='col-md-6'>
                    <div id='imageCarousel' className='carousel slide' data-bs-ride='carousel'>
                        <div className='carousel-inner'>
                            {otherImagesList}
                        </div>
                        <button className='carousel-control-prev' type='button' data-bs-target='#imageCarousel' data-bs-slide='prev'>
                            <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                            <span className='visually-hidden'>Previous</span>
                        </button>
                        <button className='carousel-control-next' type='button' data-bs-target='#imageCarousel' data-bs-slide='next'>
                            <span className='carousel-control-next-icon' aria-hidden='true'></span>
                            <span className='visually-hidden'>Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='d-flex mt-4 flex-wrap'>
                <div className='flex-grow-1'>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <div className='d-flex gap-5 mb-3'>
                        <div className='d-flex flex-column'>
                            <span><i className="fa fa-user" aria-hidden="true"></i> {capacity} Guests</span>
                            <span><i className="fa fa-codepen" aria-hidden="true"></i> {category}</span>
                        </div>
                        <div className='d-flex flex-column'>
                            <span><i className="fa fa-bath" aria-hidden="true"></i> {bathrooms} Bathrooms</span>
                            <span><i className="fa fa-bed" aria-hidden="true"></i> {beds} Beds</span>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <h6>Inclusive of</h6>
                        <div className='d-flex flex-wrap gap-2'>
                            {inclusivesList}
                        </div>
                    </div>
                    <div className='mb-3'>
                        <h6>Amenities</h6>
                        <div className='container row'>
                            {amenitiesList}
                        </div>
                    </div>
                    <div className=''>
                        <h6>House Rules</h6>
                        <div className='container row'>
                            <p className='col-md-6'><i className="fa fa-clock-o" aria-hidden="true"></i> {rules.checkin}</p>
                            <p className='col-md-6'><i className="fa fa-clock-o" aria-hidden="true"></i> {rules.checkout}</p>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <h6>Location</h6>
                        <p><i className="fa fa-map-marker" aria-hidden="true"></i> {location}</p>
                    </div>
                    <div className='mb-3'>
                        <h6>Contact Host</h6>
                        <p><i className="fa fa-user" aria-hidden="true"></i> {host.name}</p>
                        <p><i className="fa fa-envelope" aria-hidden="true"></i><a href={`mailto:${host.email}`} className='text-dark'> {host.email}</a></p>
                        <p><i className="fa fa-phone-square" aria-hidden="true"></i><a href={`tel:${host.phone}`} className='text-dark'> {host.phone}</a></p>
                    </div>
                </div>
                <div className='w-50'>
                    <div className='card p-4'>
                        <h4>$ {price}</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">From:</label>
                                <input type="date" className="form-control"/>
                                <label htmlFor="exampleInputPassword1" className="form-label">To:</label>
                                <input type="date" className="form-control"/>
                            </div>
                            <div className='d-flex gap-3'>
                                <button type="submit" className="btn btn-primary">Book Now</button>
                                <button type="button" className="btn btn-primary" onClick={goBack}>Go Back</button>
                            </div>
                        </form>
                    </div>  
                </div>
            </div>
        </div>
    </div>
  )
}
