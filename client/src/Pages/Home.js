import React, { useContext } from 'react'
import Landing from '../Components/Landing'
import { PropertyContext } from '../context/PropertyContext'

export default function Home(props) {
 const{properties} = useContext(PropertyContext)
 console.log(properties)

  return (
    <div>
        <Landing API_URL={props.API_URL}></Landing>
    </div>
  )
}
