import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setUser } from './redux/slices/authSlice.js';
import { getFollowingMe, getFollowMe } from './redux/slices/followSlice.js';
import { ThemeProvider } from './context/ThemeContext';
import SignInPage from './components/ui/signInForm/signInForm';
import SignUpPage from './components/ui/signUpForm/signUpForm';

import PrivateRoutesUsers from "./privateRoutes/PrivateRoutesUsers.jsx";
import { Footer } from "./components/ui/footer/Footer.jsx";
import { ImageForm } from "./components/ui/imageForm/ImageForm.jsx";
import Sidebar from "./components/ui/sidebarPart/SidebarPart.jsx";
import CreateNewPostPage from "../pages/createNewPostPage/CreateNewPostPage.jsx";
import updateProfilePage from "../pages/updateProfilePage/UpdateProfilePage.jsx";
import ExplorePage from "./pages/explorePage/ExplorePage.jsx";
import HomePage from "./pages/homePage/HomePage.jsx";
import { SignInPage } from "./pages/signInPage/SignInPage.jsx";
import ChatPage from "./pages/chatPage/ChatPage.jsx";
import AnotherProfilePage from "./pages/anotherProfilePage/AnotherProfilePage.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import { SignUpPage } from "./pages/signUpPage/SignUpPage.jsx";
import { ResetPage } from "./pages/resetPage/ResetPage.jsx";
import { setUser } from "./redux/slices/authSlice.js";
import { getFollowingMe, getFollowMe } from "./redux/slices/followSlice.js";
import dark from "./assets/dark_mode.svg";
import light from "./assets/light_mode.svg";
import { useTheme } from "./helpers/ThemeContext.jsx";
import './index.css';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        dispatch(setUser({ token, user: parsedUser }));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getFollowMe(user._id));
      dispatch(getFollowingMe(user._id));
    }
  }, [dispatch, user]);

  return (
    <ThemeProvider>
      <div className="globalContainer">
        <Router>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route path="/upload" element={<ImageForm />} />

            {/* Приватные маршруты */}
            <Route element={<PrivateRoutesUsers />} />
            <Route path="/home" element={ <Layout><HomePage /></Layout>} />
            <Route path="/explore" element={ <Layout><ExplorePage /></Layout>} />
            <Route path="/messages" element={<Layout><MessagesPage /></Layout>}/>
            <Route path="/create" element={<Layout><CreatePage /></Layout>}/>
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>}/>
            <Route path="/profile/edit" element={<Layout><EditProfilePage /></Layout>}/>
            <Route path="/profile/:userId" element={<Layout><OtherProfilePage /></Layout>}/>
            
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
