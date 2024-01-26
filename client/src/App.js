import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/Home';
import InfoListing from './Pages/InfoListing';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import UpdateListing from './Pages/UpdateListing';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import MyBookings from './Pages/MyBookings';
import PropertyProvider from './context/PropertyContext';
import ReservationProvider from './context/ReservationContext';
import NoPage from './Pages/NoPage';
import ResetPassword from './Pages/ResetPassword';

import UserProvider from './context/UserContext';
import AddListing from './Components/AddListing';
import MyPropertyList from './Pages/MyPropertyList';
import MyClients from './Pages/MyClients';


function App() {

  return (
    <BrowserRouter>
    <ReservationProvider>
    <UserProvider>
      <PropertyProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/properties/:id' element={<InfoListing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/mybookings' element={<MyBookings />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='update_property/:id' element={<UpdateListing />} />
            <Route path='/reset_password' element={<ResetPassword />} />
            <Route path='/add_property' element={<AddListing/>} />
            <Route path='/my_property' element={<MyPropertyList/>} />
            <Route path='/my_clients/:id' element={<MyClients/>} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </PropertyProvider>
      </UserProvider>
      </ReservationProvider>
    </BrowserRouter>
  );
}

export default App;
