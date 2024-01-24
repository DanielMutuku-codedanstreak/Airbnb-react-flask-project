import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const PropertyContext = createContext()

export default function PropertyProvider({children}) {
  const PROPERTY_API_URL = '/properties'
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    fetch(PROPERTY_API_URL)
    .then(res => res.json())
    .then(data => {
      setAllListings(data)
    })
    .catch(error => console.log(`Error fetching listings data, ${error}`))
  }, [])


   const contextData = {
      allListings

   }
  return (
    <PropertyContext.Provider value={contextData}>
      {children}
    </PropertyContext.Provider>
  )
}
