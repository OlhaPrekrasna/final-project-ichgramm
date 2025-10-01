import React from 'react';
import s from './input.module.css';

function Input({
  placeholder = '',
  value = '',
  onChange,
  icon,
  errorMessage,
  type = 'text',
  className = '',
  style = {},
  showError = true,
}) {
  const handleInputChange = (e) => {
    if (onChange) onChange(e);
  };

  const inputClass = [
    s.inputContainer, 
    errorMessage ? s.error : '', 
    icon ? s.hasIcon : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={inputClass}>
      {icon && <span className={s.icon}>{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={s.input}
        style={style}
      />
      {showError && errorMessage && (
        <div className={s.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}

export default Input;