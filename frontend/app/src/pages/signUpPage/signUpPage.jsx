import React from 'react';
import SignUpForm from "../../components/ui/signUpForm/signUpForm.jsx";
import s from "./SignUpPage.module.css";

const SignUpPage = () => {
    return (
        <div className={s.signUpPage}>
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;