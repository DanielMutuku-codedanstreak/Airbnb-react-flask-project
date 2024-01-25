import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';

export default function AddListing() {
    const navigate = useNavigate();
    const propertyContext = useContext(PropertyContext);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        image: '',
        other_images: [],
        price: '',
        inclusives: [],
        amenities: [],
        rules: {
        checkin: '',
        checkout: '',
        },
        capacity: '',
        bathrooms: '',
        beds: '',
        location: '',
    });

    // Function to handle change event
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'other_images' || name === 'inclusives' || name === 'amenities') {
        // Split the input values based on newline
        const arrayValues = value.split('\n');
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: arrayValues,
        }));
        } else if (name.startsWith('rules')) {
        // Handle nested rules object
        const [ruleKey, ruleProperty] = name.split('.');
        setFormData((prevFormData) => ({
            ...prevFormData,
            rules: {
            ...prevFormData.rules,
            [ruleProperty]: value,
            },
        }));
        } else {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const data = await propertyContext.addProperty(formData);

        // Handle success
        Swal.fire({
            title: 'Good job!',
            text: 'Property added successfully',
            icon: 'success',
        });

        navigate('/');
        } catch (error) {
        // Handle error
        console.log('Error adding property:', error);
        Swal.fire('Error', 'An error occurred while adding the property.', 'error');
        }
    };

  return (
    <div id="addSection">
        <div className="container mt-5">
            <div className="listingContainer row">
                
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

                        <div className="container mt-4">
                                    <label htmlFor="exampleDropdown">Category:</label>
                                    <select
                                        className="form-control"
                                        id="exampleDropdown"
                                        name="category"
                                        required
                                        onChange={handleChange}
                                        value={formData.category}
                                    >
                                        <option >Select Category</option>
                                        <option value="One-bedroom">One-bedroom</option>
                                        <option value="Two-bedroom">Two-bedroom</option>
                                        <option value="Three-bedroom">Three-bedroom</option>
                                    </select>
                            </div>

                        <div className="mb-3">
                            <label htmlFor="image">Image URL</label>
                            <input type="url" id="image" name="image" className="form-control" required onChange={handleChange} value={formData.image}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="otherimages">Other image URLs (optional)</label>
                            <textarea
                                id="otherimages"
                                name="other_images"
                                className="form-control"
                                placeholder="Enter other image URLs separated by a newline"
                                rows="4"
                                onChange={handleChange}
                                value={formData.other_images.join('\n')}
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
                                placeholder="Enter inclusives (eg. meal plan: bed and breakfast, pickup and return) each separated by a newline"
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
                                placeholder="Enter amenities separated by a newline (eg. TV, airconditioning, wifi)"
                                rows="4"
                                onChange={handleChange}
                                value={formData.amenities.join('\n')}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="checkin">Check in(time)</label>
                            <input type="text" id="checkin" name="rules.checkin" className="form-control" required onChange={handleChange} value={formData.rules.checkin}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="checkout">Check out(time)</label>
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
                      
                        <button type="submit" className="btn btn-primary">Add Property</button>
                    </form>

                </div>         

                
            </div>
            
            
        </div>
    </div>
  )
}
