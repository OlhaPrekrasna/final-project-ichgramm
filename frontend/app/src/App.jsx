import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom'; // добавил Navigate
import { setUser } from './redux/slices/authSlice.js';
import { getFollowingMe, getFollowMe } from './redux/slices/followSlice.js';
import SignInPage from './components/ui/signInForm/signInForm';
import SignUpPage from './components/ui/signUpForm/signUpForm';
import PrivateRoutesUsers from './privateRoutes/PrivateRoutesUsers.jsx';
import Footer from './components/ui/footer/Footer.jsx';
import ImageForm from './components/ui/imageForm/ImageForm.jsx';
import Sidebar from './components/ui/sidebarPart/SidebarPart.jsx';
import NavigationSidebar from './components/ui/navigationSidebar/NavigationSidebar.jsx';
import CreateNewPostPage from './pages/createNewPostPage/CreateNewPostPage.jsx';
import UpdateProfilePage from './pages/updateProfilePage/UpdateProfilePage.jsx';
import ExplorePage from './pages/explorePage/ExplorePage.jsx';
import HomePage from './pages/homePage/HomePage.jsx';
import ChatPage from './pages/chatPage/ChatPage.jsx';
import AnotherProfilePage from './pages/anotherProfilePage/AnotherProfilePage.jsx';
import ProfilePage from './pages/profilePage/ProfilePage.jsx';
import ResetPage from './pages/resetPage/ResetPage.jsx';
import PostPage from './pages/postPage/PostPage.jsx';
// import dark from './assets/dark_mode.svg';
// import light from './assets/light_mode.svg';
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
    <div className="globalContainer">
      <NavigationSidebar />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="/upload" element={<ImageForm />} />
        {/* Приватные маршруты */}
        <Route element={<PrivateRoutesUsers />}>
          <Route path="/messages" element={<ChatPage />} />
          <Route path="/create" element={<CreateNewPostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<UpdateProfilePage />} />
          <Route path="/profile/:userId" element={<AnotherProfilePage />} />
          <Route path="/posts/:id" element={<PostPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
