import { useState } from 'react';
import { Link } from 'react-router-dom';
import { $api } from '../../api/Api.jsx';
import Button from '../../common/Button/Button.jsx';
import Input from '../../common/Input/Input.jsx';
import trouble from '../../assets/trouble_logging _in.svg';
import s from './resetForm.module.css';

const ResetForm = () => {
  const { t } = useTranslation();

  const [userObject, setUserObject] = useState({
    email: '',
    password: '',
    username: '',
    full_name: '',
  });

  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setUserObject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckUser = async (e) => {
    e.preventDefault();
    setError('');

    if (!userObject.email) {
      setError(t('resetForm.emailRequired'));
      return;
    }

    setIsLoading(true);
    try {
      const response = await $api.post('/auth/check-user', {
        email: userObject.email,
      });
      if (response.status === 200) {
        setIsPasswordReset(true);
      } else {
        setError(t('resetForm.userNotFound'));
      }
    } catch (error) {
      console.error('User verification error:', error);
      setError(t('resetForm.checkError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword) {
      setError(t('resetForm.passwordRequired'));
      return;
    }

    if (newPassword.length < 6) {
      setError(t('resetForm.passwordTooShort'));
      return;
    }

    setIsLoading(true);
    try {
      const response = await $api.post('/auth/update-password', {
        email: userObject.email,
        newPassword,
      });
      if (response.status === 200) {
        alert(t('resetForm.passwordUpdated'));
        setIsPasswordReset(false);
        setNewPassword('');
        setUserObject((prev) => ({ ...prev, email: '' }));
      } else {
        setError(t('resetForm.updateError'));
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError(t('resetForm.updateError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.resetFormContainer}>
      <div className={s.resetFormBox}>
        <form
          className={s.resetForm}
          onSubmit={isPasswordReset ? handleUpdatePassword : handleCheckUser}
        >
          <img src={trouble} alt="trouble logging in" className={s.logo} />
          <h5 className={s.title}>{t('resetForm.trouble')}</h5>
          <p className={s.instruction}>{t('resetForm.instruction')}</p>

          <div className={s.inputContainer}>
            <CustomInput
              placeholder={t('resetForm.placeholderEmail')}
              value={userObject.email}
              onChange={(value) => handleInputChange('email', value)}
              type="email"
              disabled={isLoading}
              style={{
                paddingLeft: '8px',
                backgroundColor: 'var(--color-bg-light-grey)',
                color: 'var(--color-text-grey)',
              }}
            />
          </div>

          {isPasswordReset && (
            <div className={s.inputContainer}>
              <Input
                placeholder={t('resetForm.placeholderNewPassword')}
                value={newPassword}
                onChange={setNewPassword}
                type="password"
                disabled={isLoading}
                style={{
                  paddingLeft: '8px',
                  backgroundColor: 'var(--color-bg-light-grey)',
                  color: 'var(--color-text-grey)',
                  marginTop: '6px',
                }}
              />
            </div>
          )}

          {error && <p className={s.errorMessage}>{error}</p>}

          <div className={s.buttonContainer}>
            <Button
              text={
                isLoading
                  ? t('resetForm.loading')
                  : isPasswordReset
                  ? t('resetForm.saveNewPasswordButton')
                  : t('resetForm.resetPasswordButton')
              }
              style={{ width: '268px', height: '32px' }}
              type="submit"
              disabled={isLoading}
            />
          </div>

          <div className={s.lineBox}>
            <div className={s.line}></div>
            <p className={s.orText}>{t('loginForm.or')}</p>
            <div className={s.line}></div>
          </div>

          <Link to={'/register'} className={s.createAccount}>
            {t('resetForm.createAccount')}
          </Link>

          <div className={s.back}>
            <Link to={'/'} className={s.backLink}>
              {t('resetForm.back')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetForm;
