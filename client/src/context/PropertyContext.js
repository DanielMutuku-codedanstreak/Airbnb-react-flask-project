import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const PropertyContext = createContext();

export default function PropertyProvider({ children }) {
  const PROPERTY_API_URL = '/properties';
  const authToken = sessionStorage.getItem('authToken');
  const [allListings, setAllListings] = useState([]);
  const [hostListings, setHostListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const [onChange, setOnChange] = useState(false)
  const [onAdd, setOnAdd] = useState(false)
  // const [onUpdate, setOnUpdate] = useState(true)

  useEffect(() => {
    fetch(PROPERTY_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setAllListings(data);
      })
      .catch((error) => console.log(`Error fetching listings data, ${error}`));
  }, [searchTerm]);

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

  useEffect(() => {
    fetch('/get_all_properties_by_user_id', {
      headers: {
        Authorization: `Bearer ${authToken && authToken}`, 
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHostListings(data);
      })
      .catch((error) => console.log(`Error fetching host listings data, ${error}`));
  }, []); 

  //Delete property
  function deleteProperty(id){
    const authToken = sessionStorage.getItem('authToken');

    fetch(`/properties/${id}`,{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken && authToken}`,
      },
    })
    .then(res => res.json())
    .then((response) => {
      if(response.ok){
        setOnChange(!onChange)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.success,
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.error,
          showConfirmButton: false,
          timer: 1500
        });
      }

      
      
    })
  }



  const contextData = {
    allListings,
    searchTerm,
    updateSearchTerm,
    searchListings,
    searchError,
    hostListings,
    deleteProperty,
    
  };

  return (
    <PropertyContext.Provider value={contextData}>
      {children}
    </PropertyContext.Provider>
  );
}
