import React, { useState } from 'react'
import DisplayAddedListing from './DisplayAddedListing';
import Swal from 'sweetalert2'

export default function AddListing(props) {
    const [submittedListings, setSubmittedListings] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        image: '',
        other_Images: [],
        price: '',
        inclusives: [],
        amenities: [],
        rules: {
          checkin: '',
          checkout: ''
        },
        capacity: '',
        bathrooms: '',
        beds: '',
        location: '',
        host: {
          name: '',
          email: '',
          phone: ''
        }
    })
    //function to handle change event
    const handleChange = (e)=>{
        const { name, value } = e.target;

        if (name === 'other_Images' || name === 'inclusives' || name === 'amenities') {
            // Split the input values based on newline
            const arrayValues = value.split('\n');
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: arrayValues,
            }))
        } else if (name.startsWith('rules')) {
            // Handle nested rules object
            const [ruleKey, ruleProperty] = name.split('.');
            setFormData((prevFormData) => ({
                ...prevFormData,
                rules: {
                    ...prevFormData.rules,
                    [ruleProperty]: value,
                },
            }))
        } else if (name.startsWith('host')) {
            // Handle nested host object
            const hostProperty = name.split('.')[1];
            setFormData((prevFormData) => ({
              ...prevFormData,
              host: {
                ...prevFormData.host,
                [hostProperty]: value,
              },
            }))
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }))
        }
    }
    //function to hndle form submission
    const handleSubmit = (e)=>{
        e.preventDefault()
        const submitData = JSON.stringify(formData)

        fetch(props.API_URL,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: submitData
        })
        .then(res => res.json())
        .then(data =>{
            setSubmittedListings(data)
            setFormData({
                title: '',
                description: '',
                category: '',
                image: '',
                other_Images: [],
                price: '',
                inclusives: [],
                amenities: [],
                rules: {
                checkin: '',
                checkout: ''
                },
                capacity: '',
                bathrooms: '',
                beds: '',
                location: '',
                host: {
                name: '',
                email: '',
                phone: ''
                }
            })
            Swal.fire({
                title: "Good job!",
                text: "Listing added successfully. Preview it below!",
                icon: "success"
            });
        })
        .catch(error => {
            console.log(`There was a problem adding a listing,${error}`)
            Swal.fire('Error', 'An error occurred while adding the listing.', 'error');
        })
    }

  return (
    <div id="addSection">
        <div className="container mt-5">
            <div className="listingContainer row">
                {/*Add Listing Form (Left Side)*/}
                <div className="col-md-6">
                    <form id="addListingForm" className="mb-4" onSubmit={handleSubmit}>
                        <h2>Add New Listing</h2>
                        <div className="mb-3">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" className="form-control" placeholder="eg: Luxury..." required onChange={handleChange} value={formData.title}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" className="form-control" placeholder="eg: Enjoy your stay..." rows="4" required onChange={handleChange} value={formData.description}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category">Category</label>
                            <input type="text" id="category" name="category" placeholder="eg: Two bedroom" className="form-control" required onChange={handleChange} value={formData.category}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image">Image URL</label>
                            <input type="text" id="image" name="image" className="form-control" required onChange={handleChange} value={formData.image}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="otherimages">Other image URLs (optional)</label>
                            <textarea
                                id="otherimages"
                                name="other_Images"
                                className="form-control"
                                placeholder="Enter other image URLs separated by a newline"
                                rows="4"
                                onChange={handleChange}
                                value={formData.other_Images.join('\n')}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price">Price per Night</label>
                            <input type="number" id="price" name="price" className="form-control" required onChange={handleChange} value={formData.price}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="amenities">Inclusives(optional)</label>
                            <textarea
                                id="inclusives"
                                name="inclusives"
                                className="form-control"
                                placeholder="Enter inclusives separated by a newline"
                                rows="4"
                                onChange={handleChange}
                                value={formData.inclusives.join('\n')}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="amenities">Amenities (optional)</label>
                            <textarea
                                id="amenities"
                                name="amenities"
                                className="form-control"
                                placeholder="Enter amenities separated by a newline"
                                rows="4"
                                onChange={handleChange}
                                value={formData.amenities.join('\n')}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="checkin">Check in</label>
                            <input type="text" id="checkin" name="rules.checkin" className="form-control" required onChange={handleChange} value={formData.rules.checkin}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="checkout">Check out</label>
                            <input type="text" id="checkout" name="rules.checkout" className="form-control" required onChange={handleChange} value={formData.rules.checkout}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity">Capacity</label>
                            <input type="number" id="capacity" name="capacity" className="form-control" required onChange={handleChange} value={formData.capacity}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bathrooms">Bathrooms</label>
                            <input type="number" id="bathrooms" name="bathrooms" className="form-control" required onChange={handleChange} value={formData.bathrooms}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="beds">Beds</label>
                            <input type="number" id="beds" name="beds" className="form-control" required onChange={handleChange} value={formData.beds}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location">Location</label>
                            <input type="text" id="location" name="location" className="form-control" required onChange={handleChange} value={formData.location}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name">Host Name</label>
                            <input type="text" id="name" name="host.name" className="form-control" required onChange={handleChange} value={formData.host.name}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Host Email</label>
                            <input type="email" id="email" name="host.email" className="form-control" required onChange={handleChange} value={formData.host.email}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone">Host Phone Number</label>
                            <input type="tel" id="phone" name="host.phone" className="form-control" placeholder="eg: (254)7..." required onChange={handleChange} value={formData.host.phone}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Listing</button>
                    </form>
                </div>
                {/* Display Added Listings Section (Right Side)*/}
                <div className="col-md-6">
                    
                </div>
            </div>
            <div id="AddListingsSection">
                <h2 className='mb-3'>Listings</h2>
                {/* Added listing will be displayed here */}
                <DisplayAddedListing submittedListings={submittedListings}></DisplayAddedListing>
            </div>
        </div>
    </div>
  )
}
