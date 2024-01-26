import React from 'react'

export default function SortBar() {

  return (
    <div>
        <label htmlFor="sortCriteria">Sort By:</label>
        <select id='sortCriteria'>
            <option value=''>Select</option>
            <option value='title'>Name</option>
            <option value='price'>Price</option>
        </select>
    </div>
  )
}
