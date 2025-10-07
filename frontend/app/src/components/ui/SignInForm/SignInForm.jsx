import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { $api } from '../../../api/Api.jsx';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import s from './SignInForm.module.css';
import logo from '../../../assets/logo-ichgram.svg';
import phones from '../../../assets/phones.svg';
import logoutIcon from '../../../assets/logout.svg';
import { setUser } from '../../../redux/slices/authSlice.js';

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userObject, setUserObject] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    
    // Очищаем ошибки при вводе
    if (field === 'email' && emailError) {
      setEmailError('');
    }
    if (field === 'password' && passwordError) {
      setPasswordError('');
    }
    if (authError) {
      setAuthError('');
    }
    
    setUserObject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;

    if (userObject.email.trim() === '') {
      setEmailError('Username or email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (userObject.password === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormTouched(true);

    // Валидируем форму только при отправке
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setAuthError('');

    try {
      const response = await $api.post('/auth/signin', userObject);
      const { token, user } = response.data;

      if (token) {
        dispatch(setUser({ token, user }));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      } else {
        setAuthError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('Invalid username/email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUser({ token: null, user: null }));
    navigate('/signin');
  };

  return (
    <div className={s.pageContainer}>
      <div className={s.contentWrapper}>
        <div className={s.phonesSection}>
          <img src={phones} alt="Phones" className={s.phonesImage} />
        </div>

        <div className={s.formSection}>
          <div className={s.formBox}>
            <form className={s.signInForm} onSubmit={handleSubmit}>
              <img src={logo} alt="logo" className={s.logo} />
              <Input
                placeholder="Username or email"
                value={userObject.email}
                onChange={handleInputChange('email')}
                type="text"
                errorMessage={emailError}
                style={{ width: '268px' }}
              />
              <div className={s.passwordContainer}>
                <Input
                  placeholder="Password"
                  value={userObject.password}
                  onChange={handleInputChange('password')}
                  type={showPassword ? 'text' : 'password'}
                  errorMessage={passwordError}
                  style={{ width: '268px' }}
                />
                <span
                  className={s.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </span>
              </div>
              <Button
                text="Log in"
                type="submit"
                style={{
                  width: '268px',
                  height: '32px',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginTop: '8px',
                }}
                disabled={isSubmitting}
              />
              {authError && <div className={s.errorMessage}>{authError}</div>}
              <div className={s.lineBox}>
                <div className={s.line}></div>
                <p>OR</p>
                <div className={s.line}></div>
              </div>
              <div className={s.forgotPasswordContainer}>
                <Link to="/reset" className={s.forgotPasswordLink}>
                  Forgot password?
                </Link>
              </div>
            </form>

            <div className={s.haveAccountBox}>
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className={s.signUpLink}>
                  Sign up
                </Link>
              </p>
            </div>

            <div className={s.logoutBox}>
              <button className={s.logoutButton} onClick={handleLogout}>
                <img src={logoutIcon} alt="Logout" className={s.logoutIcon} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;


// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
// import { $api } from '../../../api/Api.jsx';
// import Input from '../../common/Input/Input';
// import Button from '../../common/Button/Button';
// import s from './SignInForm.module.css';
// import logo from '../../../assets/logo-ichgram.svg';
// import phones from '../../../assets/phones.svg';
// import logoutIcon from '../../../assets/logout.svg';
// import { setUser } from '../../../redux/slices/authSlice.js';

// const SignInForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [userObject, setUserObject] = useState({ email: '', password: '' });
//   const [showEmailError, setShowEmailError] = useState(false);
//   const [showPasswordError, setShowPasswordError] = useState(false);
//   const [emailErrorMessage, setEmailErrorMessage] = useState('');
//   const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [authError, setAuthError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleInputChange = (field) => (event) => {
//     setUserObject((prev) => ({
//       ...prev,
//       [field]: event.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let hasError = false;

//     if (userObject.email === '') {
//       setShowEmailError(true);
//       setEmailErrorMessage('Username or email is required');
//       hasError = true;
//     } else {
//       setShowEmailError(false);
//       setEmailErrorMessage('');
//     }

//     if (userObject.password === '') {
//       setShowPasswordError(true);
//       setPasswordErrorMessage('Password is required');
//       hasError = true;
//     } else {
//       setShowPasswordError(false);
//       setPasswordErrorMessage('');
//     }

//     if (!hasError) {
//       setIsSubmitting(true);
//       setAuthError('');

//       try {
//         const response = await $api.post('/auth/signin', userObject);
//         const { token, user } = response.data;

//         if (token) {
//           dispatch(setUser({ token, user }));
//           localStorage.setItem('token', token);
//           localStorage.setItem('user', JSON.stringify(user));
//           navigate('/home');
//         } else {
//           setAuthError('Invalid credentials');
//         }
//       } catch (error) {
//         console.error('Login error:', error);
//         setAuthError('Invalid username/email or password');
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     dispatch(setUser({ token: null, user: null }));
//     navigate('/signin');
//   };

//   return (
//     <div className={s.pageContainer}>
//       <div className={s.contentWrapper}>
//         <div className={s.phonesSection}>
//           <img src={phones} alt="Phones" className={s.phonesImage} />
//         </div>

//         <div className={s.formSection}>
//           <div className={s.formBox}>
//             <form className={s.signInForm} onSubmit={handleSubmit}>
//               <img src={logo} alt="logo" className={s.logo} />
//               <Input
//                 placeholder="Username or email"
//                 value={userObject.email}
//                 onChange={handleInputChange('email')}
//                 type="text"
//                 errorMessage={showEmailError ? emailErrorMessage : ''}
//                 style={{ width: '268px' }}
//               />
//               <div className={s.passwordContainer}>
//                 <Input
//                   placeholder="Password"
//                   value={userObject.password}
//                   onChange={handleInputChange('password')}
//                   type={showPassword ? 'text' : 'password'}
//                   errorMessage={showPasswordError ? passwordErrorMessage : ''}
//                   style={{ width: '268px' }}
//                 />
//                 <span
//                   className={s.eyeIcon}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
//                 </span>
//               </div>
//               <Button
//                 text="Log in"
//                 type="submit"
//                 style={{
//                   width: '268px',
//                   height: '32px',
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   marginTop: '8px',
//                 }}
//                 disabled={isSubmitting}
//               />
//               {authError && <div className={s.errorMessage}>{authError}</div>}
//               <div className={s.lineBox}>
//                 <div className={s.line}></div>
//                 <p>OR</p>
//                 <div className={s.line}></div>
//               </div>
//               <div className={s.forgotPasswordContainer}>
//                 <Link to="/reset" className={s.forgotPasswordLink}>
//                   Forgot password?
//                 </Link>
//               </div>
//             </form>

//             <div className={s.haveAccountBox}>
//               <p>
//                 Don't have an account?{' '}
//                 <Link to="/signup" className={s.signUpLink}>
//                   Sign up
//                 </Link>
//               </p>
//             </div>

//             <div className={s.logoutBox}>
//               <button className={s.logoutButton} onClick={handleLogout}>
//                 <img src={logoutIcon} alt="Logout" className={s.logoutIcon} />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInForm;
