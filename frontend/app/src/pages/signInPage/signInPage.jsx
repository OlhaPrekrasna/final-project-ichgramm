import React from 'react';
import s from './SignInPage.module.css';
import phones from '../../assets/phones.svg';
import SignInForm from '../../components/ui/signInForm';

const SignInPage = () => {
  return (
    <div className={s.signInPage}>
      <img
        src={phones}
        alt="phones with app interface"
        className={s.phonesImage}
      />
      <div className={s.signInFormBox}>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
