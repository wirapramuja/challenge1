/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '../../auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Register with:', { name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="auth-form">
      <h2 className="auth-title">Sign Up (Dummy)</h2>
      <div>
        <label className="auth-label">Full Name</label>
        <input
          type="text"
          className="auth-input"
          //   onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>
      <div>
        <label className="auth-label">Email</label>
        <input
          type="email"
          className="auth-input"
          //   onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div>
        <label className="auth-label">Password</label>
        <input
          type="password"
          className="auth-input"
          //   onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>
      <button type="submit" className="auth-button">
        Create Account
      </button>
      <p className="auth-footer">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </form>
  );
};

export default Register;
