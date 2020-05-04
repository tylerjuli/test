import React from 'react';

const Alert = ({children, className}) => {
  return (
    <div className={`alert ${className}`} role="alert">
        {children}
    </div>
  );
};

export default Alert;