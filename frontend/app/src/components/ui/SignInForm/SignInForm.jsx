import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { $api } from '../../../api/api';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import s from './SignInForm.module.css';
import logo from '../../../assets/logo-ichgram.svg';
import phones from '../../../assets/phones.svg';
import { setUser } from '../../../redux/slices/authSlice';

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userObject, setUserObject] = useState({ email: '', password: '' });
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field) => (event) => {
    setUserObject((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (userObject.email === '') {
      setShowEmailError(true);
      setEmailErrorMessage('Username or email is required');
      hasError = true;
    } else {
      setShowEmailError(false);
      setEmailErrorMessage('');
    }

    if (userObject.password === '') {
      setShowPasswordError(true);
      setPasswordErrorMessage('Password is required');
      hasError = true;
    } else {
      setShowPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!hasError) {
      setIsSubmitting(true);
      setAuthError('');

      try {
        const response = await $api.post('/auth/login', userObject);
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
    }
  };

  return (
    <div className={s.pageContainer}>
      <div className={s.contentWrapper}>
        {/* Блок с телефонами */}
        <div className={s.phonesSection}>
          <img src={phones} alt="Phones" className={s.phonesImage} />
        </div>

        {/* Блок с формой */}
        <div className={s.formSection}>
          <div className={s.formBox}>
            <form className={s.signInForm} onSubmit={handleSubmit}>
              <img src={logo} alt="logo" className={s.logo} />
              <Input
                placeholder="Username or email"
                value={userObject.email}
                onChange={handleInputChange('email')}
                type="text"
                errorMessage={showEmailError ? emailErrorMessage : ''}
                style={{ width: '268px' }}
              />
              <div className={s.passwordContainer}>
                <Input
                  placeholder="Password"
                  value={userObject.password}
                  onChange={handleInputChange('password')}
                  type={showPassword ? 'text' : 'password'}
                  errorMessage={showPasswordError ? passwordErrorMessage : ''}
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
                <Link to="/register" className={s.signUpLink}>
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

