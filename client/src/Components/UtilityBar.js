import React from 'react'
import SortBar from './SortBar'
import SearchBar from './SearchBar'

export default function UtilityBar(props) {
  return (
    <div className='container mb-2'>
        <div className='row'>
            <div className='col-md-6'>
                <SearchBar listings={props.listings} onSearch={props.handleSearch}></SearchBar>
            </div>
            <div className='col-md-6'>
                <SortBar listings={props.listings} setListings={props.setListings}></SortBar>
            </div>
        </div>
    </div>
  )
}
