import React from 'react'
import SortBar from './SortBar'
import SearchBar from './SearchBar'

export default function UtilityBar() {
  return (
    <div className='container mb-2'>
        <div className='row'>
            <div className='col-md-6'>
                <SearchBar />
            </div>
            <div className='col-md-6'>
                <SortBar />
            </div>
        </div>
    </div>
  )
}
