import React, { useState } from 'react';
import './style.css';

export const FrameLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    if (username && password) {
      onLogin(username);
    }
  };

  return (
    <div className="frame-login">
      <div className="login-container">
        <div className="login-logo">
          <div className="text-wrapper-10">TreeTalk</div>
          <img className="remove-BG" alt="TreeTalk Logo" src="/img/remove-bg-369-1.png" />
        </div>
        <div className="login-form">
          <input
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
        <div className="register-link">
          <span>Don't have an account? </span>
          <a href="#">Register Here</a>
        </div>
      </div>
    </div>
  );
};
