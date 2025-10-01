import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setUser } from './redux/slices/authSlice';
import { getFollowingMe, getFollowMe } from './redux/slices/followSlice';
import SignInPage from './components/ui/SignInForm/signInForm';
import SignUpPage from './components/ui/signUpForm/signUpForm';

import './index.css';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      dispatch(setUser({ token, user: JSON.parse(user) }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getFollowMe(user._id));
      dispatch(getFollowingMe(user._id));
    }
  }, [dispatch, user]);

  return (
    <div className="globalContainer">
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
