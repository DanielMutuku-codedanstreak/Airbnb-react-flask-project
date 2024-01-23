import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/Home';
import InfoListing from './Pages/InfoListing';
import Login from './Pages/Login';
import { useState } from 'react';
import Admin from './Pages/Admin';
import ViewAllListing from './Pages/ViewAllListing';
import ViewSingleListing from './Pages/ViewSingleListing';
import UpdateListing from './Pages/UpdateListing';

const API_URL = 'https://airbnb-react-k4zr.onrender.com/listings' 

function App() {
  //create a useState for login
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [allListings, setAllListings]=useState([])

  //function to delete listing from DOM
  const deleteListing = (id)=>{
    const updatedListings = allListings.filter((listing)=>(listing.id !== id))
    //console.log(updatedListings)
    setAllListings(updatedListings)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Layout>}>
          <Route index element={<Home API_URL={API_URL}></Home>}></Route>
          <Route path='/airbnb/:id' element={<InfoListing API_URL={API_URL}></InfoListing>}></Route>
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}></Login>}></Route>
          <Route path='/admin' element={<Admin isLoggedIn={isLoggedIn} API_URL={API_URL}></Admin>}></Route>
          <Route path='/admin/viewall' element={<ViewAllListing isLoggedIn={isLoggedIn} API_URL={API_URL} allListings={allListings} setAllListings={setAllListings}></ViewAllListing>}></Route>
          <Route path='/admin/viewall/:id' element={<ViewSingleListing isLoggedIn={isLoggedIn} API_URL={API_URL} onDelete={deleteListing}></ViewSingleListing>}></Route>
          <Route path='/admin/edit/:id' element={<UpdateListing isLoggedIn={isLoggedIn} API_URL={API_URL} ></UpdateListing>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
