import React, { useState } from 'react'

export default function SearchBar(props) {
    const [formData, setFormData] = useState('')
    
  return (
    <div>
        <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={formData} onChange={(e)=> {setFormData(e.target.value); props.onSearch(e.target.value)}} />
        </form>
    </div>
  )
}
