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

function App() {
  //create a useState for login
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <PropertyProvider>
        <Routes>
          <Route path='/' element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
            <Route index element={<Home />} />
            <Route path='/airbnb/:id' element={<InfoListing />} />
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/register' element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/profile' element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/mybookings' element={<MyBookings setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/admin' element={<Admin isLoggedIn={isLoggedIn} />} />
            <Route path='/admin/viewall' element={<ViewAllListing isLoggedIn={isLoggedIn} />} />
            <Route path='/admin/viewall/:id' element={<ViewSingleListing isLoggedIn={isLoggedIn} />} />
            <Route path='/admin/edit/:id' element={<UpdateListing isLoggedIn={isLoggedIn} />} />
          </Route>
        </Routes>
      </PropertyProvider>
    </BrowserRouter>
  );
}

export default App;
