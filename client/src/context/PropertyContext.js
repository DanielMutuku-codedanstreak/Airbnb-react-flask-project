import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const PropertyContext = createContext()

export default function PropertyProvider({children}) {
   const [properties, setProperties] = useState([])

   useEffect(() => {
     
      fetch('/properties')
      .then(res => res.json())
      .then(response => {
            setProperties(response)
        })
   }, [])
   




   const contextData = {
      properties

   }
  return (
    <PropertyContext.Provider value={contextData}>
      {children}
    </PropertyContext.Provider>
  )
}
