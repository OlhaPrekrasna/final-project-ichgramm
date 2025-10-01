import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { $api } from '../../../api/api';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import s from './signUpForm.module.css';
import logo from '../../../assets/logo-ichgram.svg';

import { setUser } from '../../redux/slices/authSlice';

import './SignInForm.css';

const SignInForm = () => {
  const { t } = useTranslation();
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

  // обработчик изменения полей
  const handleInputChange = (field) => (value) => {
    setUserObject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // валидация email
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (userObject.email === '') {
      setShowEmailError(true);
      setEmailErrorMessage(t('SignInForm.emailRequired'));
      hasError = true;
    } else if (!validateEmail(userObject.email)) {
      setShowEmailError(true);
      setEmailErrorMessage(t('SignInForm.emailInvalidFormat'));
      hasError = true;
    } else {
      setShowEmailError(false);
      setEmailErrorMessage('');
    }

    if (userObject.password === '') {
      setShowPasswordError(true);
      setPasswordErrorMessage(t('SignInForm.passwordRequired'));
      hasError = true;
    } else if (userObject.password.length < 4) {
      setShowPasswordError(true);
      setPasswordErrorMessage(t('SignInForm.passwordValidation'));
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
          setAuthError(t('SignInForm.invalidCredentials'));
        }
      } catch (error) {
        console.error('Login error:', error);
        setAuthError(t('SignInForm.invalidEmailOrPassword'));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="SignInFormBox">
      <form className="SignInForm" onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <CustomInput
          placeholder={t('SignInForm.placeholderEmail')}
          value={userObject.email}
          onChange={handleInputChange('email')}
          type="email"
          style={{
            paddingLeft: '8px',
            backgroundColor: 'var(--color-bg-light-grey)',
            color: 'var(--color-text-grey)',
          }}
          showError={showEmailError}
          errorMessage={emailErrorMessage}
        />

        <div className="passwordContainer">
          <Input
            placeholder={t('SignInForm.placeholderPassword')}
            value={userObject.password}
            onChange={handleInputChange('password')}
            type={showPassword ? 'text' : 'password'}
            style={{
              paddingLeft: '8px',
              backgroundColor: 'var(--color-bg-light-grey)',
              color: 'var(--color-text-grey)',
              margin: '7px 0 15px',
            }}
            showError={showPasswordError}
            errorMessage={passwordErrorMessage}
          />
          <span
            className="eyeIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </span>
        </div>

        <Button
          text={t('SignInForm.loginButton')}
          type="submit"
          style={{ width: '268px', height: '32px' }}
          disabled={isSubmitting}
        />

        {authError && <div className="errorMessage">{authError}</div>}

        <div className="lineBox">
          <div className="line"></div>
          <p>{t('SignInForm.or')}</p>
          <div className="line"></div>
        </div>

        <Link to="/reset" className="forgotPasswordLink">
          {t('SignInForm.forgotPassword')}
        </Link>
      </form>

      <div className="haveAccountBox">
        <p>
          {t('SignInForm.haveAccount')}{' '}
          <Link
            to="/register"
            style={{ color: 'var(--color-text-blue)', fontWeight: 600 }}
          >
            {t('SignInForm.sign')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
