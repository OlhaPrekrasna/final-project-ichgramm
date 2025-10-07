import React from 'react';

const SimpleInput = ({
  placeholder = '',
  value = '',
  onChange,
  type = 'text',
  style = {},
  errorMessage = '',
}) => {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      marginBottom: '6px',
      // Принудительно скрываем все дочерние элементы кроме input
      overflow: 'hidden'
    }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          height: '38px',
          border: '1px solid #dbdbdb',
          borderRadius: '3px',
          outline: 'none',
          padding: '0 8px',
          fontSize: '12px',
          backgroundColor: '#fafafa',
          boxSizing: 'border-box',
          fontFamily: 'Roboto, sans-serif',
          ...style
        }}
        // Максимальное отключение всего
        noValidate
        formNoValidate
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        data-lpignore="true"
        data-form-type="other"
      />
      {errorMessage && (
        <div style={{
          color: '#dc3545',
          fontSize: '12px',
          marginTop: '4px',
          textAlign: 'left'
        }}>{errorMessage}</div>
      )}
    </div>
  );
};

export default SimpleInput;