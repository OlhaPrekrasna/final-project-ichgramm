import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { $api } from '../../../api/api';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import s from './signUpForm.module.css';
import logo from '../../../assets/logo-ichgram.svg';

const SignUpForm = () => {
  
  const navigate = useNavigate();

  const [userObject, setUserObject] = useState({
    email: '',
    password: '',
    username: '',
    full_name: '',
  });

  const [error, setError] = useState({
    email: '',
    username: '',
    general: '',
  });

  const handleInputChange = (field) => (event) => {
    setUserObject((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: '', username: '', general: '' });

    try {
      const response = await $api.post('/auth/register', userObject);

      if (response.status === 201) {
        navigate('/');
      }
    } catch (err) {
      console.error('Sign up error:', err);

      if (err.response) {
        const errorData = err.response.data;

        if (err.response.status === 400) {
          setError({
            email: errorData.errors?.email || '',
            username: errorData.errors?.username || '',
            general: !errorData.errors ? errorData.message : '',
          });
        } else {
          setError((prev) => ({
            ...prev,
            general: 'Произошла непредвиденная ошибка',
          }));
        }
      } else {
        setError((prev) => ({
          ...prev,
          general: 'Произошла непредвиденная ошибка',
        }));
      }
    }
  };

  return (
    <div className={s.signUpFormBox}>
      <form className={s.signUpForm} onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <h4>{/* {t('signUpForm.title')} */}Регистрация</h4>

        <Input
          placeholder="Email"
          value={userObject.email}
          onChange={handleInputChange('email')}
          type="email"
        />
        {error.email && <p className={s.errorMessage}>{error.email}</p>}

        <Input
          placeholder="Полное имя"
          value={userObject.full_name}
          onChange={handleInputChange('full_name')}
          type="text"
        />

        <Input
          placeholder="Имя пользователя"
          value={userObject.username}
          onChange={handleInputChange('username')}
          type="text"
        />
        {error.username && <p className={s.errorMessage}>{error.username}</p>}

        <Input
          placeholder="Пароль"
          value={userObject.password}
          onChange={handleInputChange('password')}
          type="password"
        />

        {error.general && <p className={s.errorMessage}>{error.general}</p>}

        <p className={s.signUpForm_p1}>
          {/* {t('signUpForm.termsInfo')} */}Регистрируясь, вы принимаете наши{' '}
          <span className={s.agreementLink}>условия</span>.
        </p>

        <p className={s.signUpForm_p2}>
          {/* {t('signUpForm.agreementText')} */}Пожалуйста, ознакомьтесь с{' '}
          <span className={s.agreementLink}>политикой конфиденциальности</span>{' '}
          и{' '}
          <span className={s.agreementLink}>
            политикой использования файлов cookie
          </span>
          .
        </p>

        <Button
          className={s.signUpButton}
          text="Зарегистрироваться"
          type="submit"
        />
      </form>

      <div className={s.haveAccountBox}>
        <p>
          Уже есть аккаунт?{' '}
          <Link to="/" className={s.loginLink}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
