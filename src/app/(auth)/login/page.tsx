'use client';

import React, { useState } from 'react';
import '../../auth.css';
import { users } from '../../../../data/users';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../../context/userContext';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      setUser(matchedUser);

      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      // Delay redirect untuk memastikan data sudah disimpan
      setTimeout(() => {
        router.push('/');
      }, 100); // 100ms delay
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2 className="auth-title">Login</h2>
      <div>
        <label className="auth-label">Email</label>
        <input
          type="email"
          className="auth-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div>
        <label className="auth-label">Password</label>
        <input
          type="password"
          className="auth-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>
      <button type="submit" className="auth-button">
        Login
      </button>

      <p className="auth-footer">
        Don’t have an account? <Link href="/register">Sign up</Link>
      </p>
    </form>
  );
};

export default Login;
