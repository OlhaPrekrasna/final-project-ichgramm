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
            general: 'Error',
          }));
        }
      } else {
        setError((prev) => ({
          ...prev,
          general: 'Error',
        }));
      }
    }
  };

  return (
    <div className={s.signUpFormBox}>
      <form className={s.signUpForm} onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <h4>Sign up to see photos and videos from your friends.</h4>

        <Input
          placeholder="Email"
          value={userObject.email}
          onChange={handleInputChange('email')}
          type="email"
          errorMessage={error.email}
          style={{ width: '268px' }}
        />

        <Input
          placeholder="Full Name"
          value={userObject.full_name}
          onChange={handleInputChange('full_name')}
          type="text"
          style={{ width: '268px' }}
        />

        <Input
          placeholder="Username"
          value={userObject.username}
          onChange={handleInputChange('username')}
          type="text"
          errorMessage={error.username}
          style={{ width: '268px' }}
        />

        <Input
          placeholder="Password"
          value={userObject.password}
          onChange={handleInputChange('password')}
          type="password"
          autoComplete="current-password"
          style={{ width: '268px' }}
        />

        {error.general && <p className={s.errorMessage}>{error.general}</p>}

        <p className={s.signUpForm_p2}>
          People who use our service may have uploaded your contact information
          to Instagram.{' '}
          <a href="#" className={s.agreementLink}>
            Learn More
          </a>
        </p>

        <p className={s.signUpForm_p1}>
          By signing up, you agree to our{' '}
          <a href="#" className={s.agreementLink}>
            Terms
          </a>
          ,{' '}
          <a href="#" className={s.agreementLink}>
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="#" className={s.agreementLink}>
            Cookies Policy
          </a>
          .
        </p>

        <Button
          text="Sign up"
          type="submit"
          style={{
            width: '268px',
            height: '32px',
            fontSize: '14px',
            fontWeight: '600',
          }}
        />
      </form>

      <div className={s.haveAccountBox}>
        <p>
          Have an account?{' '}
          <Link to="/" className={s.loginLink}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { $api } from '../../../api/api';
// import Input from '../../common/Input/Input';
// import Button from '../../common/Button/Button';
// import s from './signUpForm.module.css';
// import logo from '../../../assets/logo-ichgram.svg';

// const SignUpForm = () => {
//   const navigate = useNavigate();

//   const [userObject, setUserObject] = useState({
//     email: '',
//     password: '',
//     username: '',
//     full_name: '',
//   });

//   const [error, setError] = useState({
//     email: '',
//     username: '',
//     general: '',
//   });

//   const handleInputChange = (field) => (event) => {
//     setUserObject((prev) => ({
//       ...prev,
//       [field]: event.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError({ email: '', username: '', general: '' });

//     try {
//       const response = await $api.post('/auth/register', userObject);

//       if (response.status === 201) {
//         navigate('/');
//       }
//     } catch (err) {
//       console.error('Sign up error:', err);

//       if (err.response) {
//         const errorData = err.response.data;

//         if (err.response.status === 400) {
//           setError({
//             email: errorData.errors?.email || '',
//             username: errorData.errors?.username || '',
//             general: !errorData.errors ? errorData.message : '',
//           });
//         } else {
//           setError((prev) => ({
//             ...prev,
//             general: 'Error',
//           }));
//         }
//       } else {
//         setError((prev) => ({
//           ...prev,
//           general: 'Error',
//         }));
//       }
//     }
//   };

//   return (
//     <div className={s.signUpFormBox}>
//       <form className={s.signUpForm} onSubmit={handleSubmit}>
//         <img src={logo} alt="logo" />
//         <h4>Sign up to see photos and videos from your friends.</h4>

//         <Input
//           placeholder="Email"
//           value={userObject.email}
//           onChange={handleInputChange('email')}
//           type="email"
//         />
//         {error.email && <p className={s.errorMessage}>{error.email}</p>}

//         <Input
//           placeholder="Full Name"
//           value={userObject.full_name}
//           onChange={handleInputChange('full_name')}
//           type="text"
//         />

//         <Input
//           placeholder="Username"
//           value={userObject.username}
//           onChange={handleInputChange('username')}
//           type="text"
//         />
//         {error.username && <p className={s.errorMessage}>{error.username}</p>}

//         <Input
//           placeholder="Password"
//           value={userObject.password}
//           onChange={handleInputChange('password')}
//           type="password"
//           autoComplete="current-password"
//         />

//         {error.general && <p className={s.errorMessage}>{error.general}</p>}

//         <p className={s.signUpForm_p2}>
//           People who use our service may have uploaded your contact information
//           to Instagram.{' '}
//           <a href="#" className={s.agreementLink}>
//             Learn More
//           </a>
//         </p>

//         <p className={s.signUpForm_p1}>
//           By signing up, you agree to our{' '}
//           <a href="#" className={s.agreementLink}>
//             Terms
//           </a>
//           ,{' '}
//           <a href="#" className={s.agreementLink}>
//             Privacy Policy
//           </a>{' '}
//           and{' '}
//           <a href="#" className={s.agreementLink}>
//             Cookies Policy
//           </a>
//           .
//         </p>

//         <Button className={s.signUpButton} text="Sign up" type="submit" />
//       </form>

//       <div className={s.haveAccountBox}>
//         <p>
//           Have an account?{' '}
//           <Link to="/" className={s.loginLink}>
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { $api } from '../../../api/api';
// import Input from '../../common/Input/Input';
// import Button from '../../common/Button/Button';
// import s from './signUpForm.module.css';
// import logo from '../../../assets/logo-ichgram.svg';

// const SignUpForm = () => {

//   const navigate = useNavigate();

//   const [userObject, setUserObject] = useState({
//     email: '',
//     password: '',
//     username: '',
//     full_name: '',
//   });

//   const [error, setError] = useState({
//     email: '',
//     username: '',
//     general: '',
//   });

//   const handleInputChange = (field) => (event) => {
//     setUserObject((prev) => ({
//       ...prev,
//       [field]: event.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError({ email: '', username: '', general: '' });

//     try {
//       const response = await $api.post('/auth/register', userObject);

//       if (response.status === 201) {
//         navigate('/');
//       }
//     } catch (err) {
//       console.error('Sign up error:', err);

//       if (err.response) {
//         const errorData = err.response.data;

//         if (err.response.status === 400) {
//           setError({
//             email: errorData.errors?.email || '',
//             username: errorData.errors?.username || '',
//             general: !errorData.errors ? errorData.message : '',
//           });
//         } else {
//           setError((prev) => ({
//             ...prev,
//             general: 'Error',
//           }));
//         }
//       } else {
//         setError((prev) => ({
//           ...prev,
//           general: 'Error',
//         }));
//       }
//     }
//   };

//   return (
//     <div className={s.signUpFormBox}>
//       <form className={s.signUpForm} onSubmit={handleSubmit}>
//         <img src={logo} alt="logo" />
//         <h4>{/* {t('signUpForm.title')} */}Sign up</h4>

//         <Input
//           placeholder="Email"
//           value={userObject.email}
//           onChange={handleInputChange('email')}
//           type="email"
//         />
//         {error.email && <p className={s.errorMessage}>{error.email}</p>}

//         <Input
//           placeholder="Full Name"
//           value={userObject.full_name}
//           onChange={handleInputChange('full_name')}
//           type="text"
//         />

//         <Input
//           placeholder="Username"
//           value={userObject.username}
//           onChange={handleInputChange('username')}
//           type="text"
//         />
//         {error.username && <p className={s.errorMessage}>{error.username}</p>}

//         <Input
//           placeholder="Password"
//           value={userObject.password}
//           onChange={handleInputChange('password')}
//           type="password"
//         />

//         {error.general && <p className={s.errorMessage}>{error.general}</p>}

//         <p className={s.signUpForm_p1}>
//           {/* {t('signUpForm.termsInfo')} */}By signing up, you agree to our{' '}
//           <span className={s.agreementLink}>Terms, Privacy Policy and Cookies Policy.</span>.
//         </p>

//         <p className={s.signUpForm_p2}>
//           {/* {t('signUpForm.agreementText')} */}People who use our service may have uploaded{' '}
//           <span className={s.agreementLink}>your contact information to Instagram.</span>{' '}
//           {' '}
//           <span className={s.agreementLink}>
//           Learn more
//           </span>
//           .
//         </p>

//         <Button
//           className={s.signUpButton}
//           text="Зарегистрироваться"
//           type="submit"
//         />
//       </form>

//       <div className={s.haveAccountBox}>
//         <p>
//           Have an account?{' '}
//           <Link to="/" className={s.loginLink}>
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;
