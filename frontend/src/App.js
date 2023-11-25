import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
// import { useSelector } from 'react-redux';

import './App.css';

import Header from './components/layout/Header';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import ProductDetails from './components/product/ProductDetails';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/search/:keyword' element={<Home />} />
            <Route exact path='/product/:id' element={<ProductDetails />} />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route exact path='/password/forgot' element={<ForgotPassword />} />
            <Route
              exact
              path='/password/reset/:token'
              element={<NewPassword />}
            />
            <Route
              exact
              path='/me'
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route
              exact
              path='/me/update'
              element={<ProtectedRoute element={<UpdateProfile />} />}
            />
            <Route
              exact
              path='/password/update'
              element={<ProtectedRoute element={<UpdatePassword />} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

// const ProtectedRoute = ({ element, isAdmin }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const user = useSelector((state) => state.auth.user);
//   const navigate = useNavigate();
//   console.log('IsAuthenticated:', isAuthenticated);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login');
//     } else if (isAdmin && user.role !== 'admin') {
//       navigate('/');
//     }
//   }, [isAuthenticated, isAdmin, user, navigate]);

//   return isAuthenticated ? element : null;
// };

export default App;
