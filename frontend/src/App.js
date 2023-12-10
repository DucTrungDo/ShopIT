import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

// Cart Imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';

// Payment
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

// Order Imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

// Auth or User Imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

// Admin Imports
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import { useSelector } from 'react-redux';
import store from './store';
import axios from 'axios';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      try {
        const { data } = await axios.get('/api/v1/stripeapi');

        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        // Handle error, log, or show a happy message :)
        console.error(
          '(Dont worry about this) Error fetching Stripe API key:',
          error
        );
      }
    }

    getStripApiKey();
  }, []);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search/:keyword' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />

            {stripeApiKey && (
              <Route
                path='/payment'
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/password/forgot' element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<NewPassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/me' element={<Profile />} />
              <Route path='/me/update' element={<UpdateProfile />} />
              <Route path='/password/update' element={<UpdatePassword />} />
              <Route path='/shipping' element={<Shipping />} />
              <Route path='/confirm' element={<ConfirmOrder />} />
              <Route path='/success' element={<OrderSuccess />} />
              <Route path='/orders/me' element={<ListOrders />} />
              <Route path='/order/:id' element={<OrderDetails />} />
            </Route>
          </Routes>
        </div>
        <div>
          <Routes>
            <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/admin/products' element={<ProductsList />} />
              <Route path='/admin/product' element={<NewProduct />} />
              <Route path='/admin/product/:id' element={<UpdateProduct />} />
              <Route path='/admin/orders' element={<OrdersList />} />
              <Route path='/admin/order/:id' element={<ProcessOrder />} />
              <Route path='/admin/users' element={<UsersList />} />
              <Route path='/admin/user/:id' element={<UpdateUser />} />
              <Route path='/admin/reviews' element={<ProductReviews />} />
            </Route>
          </Routes>
        </div>
        {!loading && (!isAuthenticated || user.role !== 'admin') && <Footer />}
      </div>
    </Router>
  );
}

export default App;
