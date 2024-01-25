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
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import MyBookings from './Pages/MyBookings';
import PropertyProvider from './context/PropertyContext';
import ReservationProvider from './context/ReservationContext';

import ResetPassword from './Pages/ResetPassword';

import UserProvider from './context/UserContext';
import AddListing from './Components/AddListing';


function App() {
  //create a useState for login
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>
    <ReservationProvider>
    <UserProvider>
      <PropertyProvider>
        <Routes>
          <Route path='/' element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
            <Route index element={<Home />} />
            <Route path='/properties/:id' element={<InfoListing />} />
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/register' element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/profile' element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/mybookings' element={<MyBookings setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/admin' element={<Admin isLoggedIn={isLoggedIn} />} />
            <Route path='/admin/viewall' element={<ViewAllListing isLoggedIn={isLoggedIn} />} />
            <Route path='/admin/viewall/:id' element={<ViewSingleListing  />} />
            <Route path='editproperty/:id' element={<UpdateListing />} />
            <Route path='/reset_password' element={<ResetPassword />} />
            <Route path='/add_property' element={<AddListing/>} />
          </Route>
        </Routes>
      </PropertyProvider>
      </UserProvider>
      </ReservationProvider>
    </BrowserRouter>
  );
}

export default App;
