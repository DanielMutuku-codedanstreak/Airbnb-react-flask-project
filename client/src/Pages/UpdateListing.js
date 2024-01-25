import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { PropertyContext } from '../context/PropertyContext';

export default function UpdateListing(props) {
    const { getPropertyById, updateProperty } = useContext(PropertyContext);
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
          checkout: '',
        },
        capacity: '',
        bathrooms: '',
        beds: '',
        location: '',
        host: {
          name: '',
          email: '',
          phone: '',
        },
    });
      
    // Function to handle nested properties and handle undefined values
    const getPropertyValue = (obj, path, defaultValue = '') => {
        try {
          return path.split('.').reduce((acc, key) => acc[key], obj) || defaultValue;
        } catch (error) {
          console.error('Error getting property value:', error);
          return defaultValue;
        }
    };
      
    // Function to handle change event
    const handleChange = (e) => {
        const { name, value } = e.target;
      
        if (name === 'other_Images' || name === 'inclusives' || name === 'amenities') {
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
        } else if (name.startsWith('host')) {
          // Handle nested host object
          const hostProperty = name.split('.')[1];
          setFormData((prevFormData) => ({
            ...prevFormData,
            host: {
              ...prevFormData.host,
              [hostProperty]: value,
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
        Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
        }).then(async (result) => {
        if (result.isConfirmed) {
            try {
            setLoading(true);
            await updateProperty(params.id, formData);
            Swal.fire('Saved!', '', 'success');
            } catch (error) {
            console.log(`There was a problem updating the listing: ${error}`);
            Swal.fire('Error', 'An error occurred while updating the listing.', 'error');
            } finally {
            setLoading(false);
            }
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
            // Reset the form data
            try {
                const updatedData = await getPropertyById(params.id);
                if (updatedData) {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    title: updatedData.title || '',
                    description: updatedData.description || '',
                    category: updatedData.category || '',
                    image: updatedData.image || '',
                    other_Images: updatedData.other_images || [],
                    price: updatedData.price || '',
                    inclusives: updatedData.inclusives || [],
                    amenities: updatedData.amenities || [],
                    rules: {
                      checkin: updatedData.rules?.checkin || '',
                      checkout: updatedData.rules?.checkout || '',
                    },
                    capacity: updatedData.capacity || '',
                    bathrooms: updatedData.bathrooms || '',
                    beds: updatedData.beds || '',
                    location: updatedData.location || '',
                    host: {
                      name: updatedData.host?.name || '',
                      email: updatedData.host?.email || '',
                      phone: updatedData.host?.phone || '',
                    },
                  }));
                }
            } catch (error) {
                console.error('Error resetting form data:', error);
            }
        } else {
            Swal.fire('Action was canceled', '', 'info');
            // Nothing happens
        }
        });
    };
    
    
    // Use the getPropertyValue function to handle undefined values when populating the form
    useEffect(() => {
        const fetchProperty = async () => {
          try {
            const data = await getPropertyById(params.id);
            setFormData((prevFormData) => ({
              ...prevFormData,
              title: getPropertyValue(data, 'title'),
              description: getPropertyValue(data, 'description'),
              category: getPropertyValue(data, 'category'),
              image: getPropertyValue(data, 'image'),
              other_Images: getPropertyValue(data, 'other_images', []),
              price: getPropertyValue(data, 'price'),
              inclusives: getPropertyValue(data, 'inclusives', []),
              amenities: getPropertyValue(data, 'amenities', []),
              rules: {
                checkin: getPropertyValue(data, 'rules.checkin'),
                checkout: getPropertyValue(data, 'rules.checkout'),
              },
              capacity: getPropertyValue(data, 'capacity'),
              bathrooms: getPropertyValue(data, 'bathrooms'),
              beds: getPropertyValue(data, 'beds'),
              location: getPropertyValue(data, 'location'),
              host: {
                name: getPropertyValue(data, 'host.name'),
                email: getPropertyValue(data, 'host.email'),
                phone: getPropertyValue(data, 'host.phone'),
              },
            }));
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchProperty();
    }, [params.id, getPropertyById]);
      
  
    const goBack = () => {
      navigate(-1);
    };
  
    if (!formData || loading) {
        // Render loading state or handle appropriately
        return <div>Loading...</div>;
    }

  return (
  <div id="addSection">
    <div className="container mt-5">
        <div className="listingContainer row">
            
            <div className="col-md-6">
                <form id="addListingForm" className="mb-4" onSubmit={handleSubmit}>
                    <h2>Update Listing</h2>
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
                    <div className='d-flex flex-wrap gap-3'>
                      <button type="submit" className="btn btn-primary">Update Listing</button>
                      <button type="button" className="btn btn-primary" onClick={goBack}>Go Back</button>
                    </div>
                </form>
            </div>
            <div className="col-md-6">
                
            </div>
        </div>
    </div>
</div>
  )
}

