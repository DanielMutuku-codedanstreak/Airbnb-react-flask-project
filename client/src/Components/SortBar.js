import React, { useState } from 'react'

export default function SortBar(props) {
    const [sortCriteria, setSortCriteria] = useState('')

    //function to handle sorting
    const handleSort = (criteria)=>{
        setSortCriteria(criteria)
        let sortedListings = [...props.listings]
        if(criteria === 'price'){
            sortedListings.sort((a,b)=> a.price - b.price)
        }else if(criteria === 'title'){
            sortedListings.sort((a,b)=> a.title.localeCompare(b.title))
        }
        props.setListings(sortedListings)
    }

  return (
    <div>
        <label htmlFor="sortCriteria">Sort By:</label>
        <select id='sortCriteria' onChange={(e)=>handleSort(e.target.value)} value={sortCriteria}>
            <option value=''>Select</option>
            <option value='title'>Name</option>
            <option value='price'>Price</option>
        </select>
    </div>
  )
}
