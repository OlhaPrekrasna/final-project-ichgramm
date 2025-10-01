import SignUpForm from "../../components/ui/signUpForm/signUpForm.jsx"
import s from "./signUpPage.module.css"

export const RegisterPage = () => {

    return (
        <div className={s.registerPage}>
            <SignUpForm />
        </div>
    )
}