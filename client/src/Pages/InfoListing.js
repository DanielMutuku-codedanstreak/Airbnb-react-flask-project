import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReservationContext } from '../context/ReservationContext';

export default function InfoListing() {
  const params = useParams();
  const navigate = useNavigate();
  const { reservations, addReservation, deleteReservation } = useContext(ReservationContext);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [listing, setListing] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [numberOfNights, setNumberOfNights] = useState(0);

  // Function to fetch data of one listing
  useEffect(() => {
    fetch(`/properties/${params.id}`)
      .then((res) => res.json())
      .then((data) => setListing(data))
      .catch((error) => console.log(error));
  }, [params.id]);

  // Loading feature as we await the listing to load
  if (!listing) {
    return <div>Loading...</div>;
  }

  // Destructure our listing
  const { title, description, category, image, other_images, price, inclusives, amenities, rules, bathrooms, beds, capacity, location, host } = listing;

  // Capture inclusives
  const inclusivesList = inclusives && inclusives.map((inclusive, index) => (
    <div key={index} className='card py-3 px-2'>
      {inclusive}
    </div>
  ));

  // Capture amenities
  const amenitiesList = amenities && amenities.map((amenity, index) => (
    <div key={index} className='col-md-6'>
      <li>{amenity}</li>
    </div>
  ));

  // Capture other images
  const otherImagesList = other_images && other_images.map((otherImage, index) => (
    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
      <img src={otherImage} alt='Airbnb Loading...' className='d-block w-100 rounded'></img>
    </div>
  ));

  // Function to navigate back
  const goBack = () => {
    navigate(-1);
  };

  // Handle reservation submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Validate dates
    if (!checkInDate || !checkOutDate) {
      console.error('Please select both check-in and check-out dates');
      // You might want to provide user feedback here
      return;
    }

    // Calculate the number of nights
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    if (startDate >= endDate) {
      console.error('Invalid date range. Check-out date should be after check-in date.');
      // You might want to provide user feedback here
      return;
    }

    const numberOfNights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    setNumberOfNights(numberOfNights);

    // Ensure the number of guests does not exceed the property capacity
    if (numberOfGuests > capacity) {
      // Show an error message or handle the validation appropriately
      console.error('Number of guests exceeds property capacity');
      // You might want to provide user feedback here
      return;
    }

    // Calculate the total price based on the number of nights
    const totalPrice = price * numberOfNights;

    const requestBody = {
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      numberOfGuests,
      totalPrice,
      // Add other form fields to the request body
    };

    try {
      await addReservation(requestBody);
      // Reservation added successfully, you can redirect or show a success message
    } catch (error) {
      console.error('Error adding reservation:', error);
      // Handle error, show an error message to the user
    }
  };

  // Handle reservation deletion
  const handleDeleteReservation = (reservationId) => {
    // Call the deleteReservation function from the context
    deleteReservation(reservationId);
  };

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
                <p className='col-md-6'><i className="fa fa-clock-o" aria-hidden="true"></i> {rules && rules.checkin}</p>
                <p className='col-md-6'><i className="fa fa-clock-o" aria-hidden="true"></i> {rules && rules.checkout}</p>
              </div>
            </div>
            <div className='mb-3'>
              <h6>Location</h6>
              <p><i className="fa fa-map-marker" aria-hidden="true"></i> {location}</p>
            </div>
            <div className='mb-3'>
              <h6>Contact Host</h6>
              <p><i className="fa fa-user" aria-hidden="true"></i> {host && host.name}</p>
              <p><i className="fa fa-envelope" aria-hidden="true"></i><a href={`mailto:${host && host.email}`} className='text-dark'> {host && host.email}</a></p>
              <p><i className="fa fa-phone-square" aria-hidden="true"></i><a href={`tel:${host && host.phone}`} className='text-dark'> {host && host.phone}</a></p>
            </div>
          </div>
          <div className='w-50'>
            <div className='card p-4'>
              <h4>$ {price}</h4>
              <form onSubmit={handleBookingSubmit}>
                <div className="mb-3">
                  <label htmlFor="numberOfGuests" className="form-label">Number of Guests:</label>
                  <input type="number" className="form-control" id="numberOfGuests" value={numberOfGuests} onChange={(e) => setNumberOfGuests(parseInt(e.target.value, 10))} />
                  <label htmlFor="exampleInputEmail1" className="form-label">From:</label>
                  <input type="date" className="form-control" id="checkInDate" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                  <label htmlFor="exampleInputPassword1" className="form-label">To:</label>
                  <input type="date" className="form-control" id="checkOutDate" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                </div>
                <div>
                  <p>Total Price: $ {price * numberOfNights}</p>
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
  );
}
