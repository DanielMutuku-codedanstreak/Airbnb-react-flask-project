import React, { useContext, useState } from 'react';
import { PropertyContext } from '../context/PropertyContext';

export default function SearchBar() {
  const { searchTerm, updateSearchTerm, searchListings } = useContext(PropertyContext);
  const [formData, setFormData] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearchTerm(formData);
    searchListings();
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
