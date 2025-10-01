import React from 'react';
import s from './button.module.css';

function Button({
  text,
  onClick,
  variant = 'primary',
  disabled = false,
  icon,
  className = '',
  style = {},
  type = 'button',
}) {
  const buttonClass = [
    s.button,
    variant ? s[variant] : s.primary,
    disabled ? s.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {icon && <span className={s.icon}>{icon}</span>}
      <span className={s.text}>{text}</span>
    </button>
  );
}

export default Button;