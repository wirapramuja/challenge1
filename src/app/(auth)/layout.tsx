import React from 'react';
import '../../app/auth.css';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth-container">
      <div className="auth-box">{children}</div>
    </div>
  );
};

export default AuthLayout;
