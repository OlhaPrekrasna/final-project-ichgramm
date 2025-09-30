import { signUpForm } from "../../components/ui/SignUpForm/SignUpForm.jsx"
import s from "./registerPage.module.css"

export const RegisterPage = () => {

    return (
        <div className={s.registerPage}>
            <RegisterForm />
        </div>
    )
}