import React from 'react'
import Landing from '../Components/Landing'

export default function Home(props) {
  return (
    <div>
        <Landing API_URL={props.API_URL}></Landing>
    </div>
  )
}
