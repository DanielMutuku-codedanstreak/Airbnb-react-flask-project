import React, { createContext, useEffect, useState } from 'react';

export const PropertyContext = createContext();

export default function PropertyProvider({ children }) {
  const PROPERTY_API_URL = '/properties';
  const [allListings, setAllListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');

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

  const contextData = {
    allListings,
    searchTerm,
    updateSearchTerm,
    searchListings,
    searchError,
  };

  return (
    <PropertyContext.Provider value={contextData}>
      {children}
    </PropertyContext.Provider>
  );
}
