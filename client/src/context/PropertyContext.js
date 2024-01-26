import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const PropertyContext = createContext();

export default function PropertyProvider({ children }) {
  const PROPERTY_API_URL = 'https://airbnb-react-flask-app.onrender.com/properties';
  const authToken = sessionStorage.getItem('authToken');
  const [allListings, setAllListings] = useState([]);
  const [hostListings, setHostListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const [loading, setLoading] = useState(true);
  const [onChange, setOnChange] = useState(false)


  useEffect(() => {
    fetch(PROPERTY_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setAllListings(data);
      })
      .catch((error) => {
        console.log(`Error fetching listings data: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm, onChange]);

  useEffect(() => {
    if (authToken) {
      fetchHostListings();
    }
  }, [authToken, onChange]);

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const searchListings = () => {
    if (!searchTerm) {
      // Handle the case where searchTerm is empty
      return;
    }

    fetch(`${PROPERTY_API_URL}/${searchTerm}`)
      .then((res) => {
        if (!res.ok) {
          setSearchError('No data found');
          throw new Error('Search request failed');
        }
        return res.json();
      })
      .then((data) => {
        setAllListings(data);
        setSearchError('');
      })
      .catch((error) => {
        console.error('Error searching listings:', error);
        setAllListings([]);
      });
  };

  // Function to fetch host listings
  const fetchHostListings = () => {
    setLoading(true);

    fetch('https://airbnb-react-flask-app.onrender.com/get_all_properties_by_user_id', {
      headers: {
        Authorization: `Bearer ${authToken && authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHostListings(data);
      })
      .catch((error) => {
        console.log(`Error fetching host listings data: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to add a new property
  const addProperty = async (formData) => {
    try {
      const response = await fetch(PROPERTY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add property: ${response.statusText}`);
      }

      const data = await response.json();
      setOnChange(!onChange); // Trigger a change to update listings
      return data;
    } catch (error) {
      console.error('Error adding property:', error.message);
      throw new Error('An error occurred while adding the property.');
    }
  };

  // Function to delete a property
  const deleteProperty = async (id) => {
    try {
      const authToken = sessionStorage.getItem('authToken');
      const response = await fetch(`https://airbnb-react-flask-app.onrender.com/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken && authToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete property');
      }
  
      const data = await response.json();
      setOnChange(!onChange); // Trigger a change to update listings
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.success,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      Swal.fire('Error', 'An error occurred while deleting the property.', 'error');
    }
  };

  //get single property
  const getPropertyById = async (id) => {
    try {
      const response = await fetch(`${PROPERTY_API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken && authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch property by ID');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching property by ID:', error);
      throw new Error('An error occurred while fetching the property by ID.');
    }
  };

  //update single property
  const updateProperty = async (id, formData) => {
    try {
      const response = await fetch(`${PROPERTY_API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken && authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update property');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating property:', error);
      throw new Error('An error occurred while updating the property.');
    }
  };
  

  const contextData = {
    allListings,
    hostListings,
    searchTerm,
    updateSearchTerm,
    searchListings,
    searchError,
    deleteProperty,
    addProperty,
    loading,
    getPropertyById,
    updateProperty,
    fetchHostListings,
  };

  return (
    <PropertyContext.Provider value={contextData}>
      {children}
    </PropertyContext.Provider>
  )
}
