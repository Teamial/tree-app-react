import React, { useState } from 'react';
import './style.css';

export const FrameLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="frame-login">
      <div className="div-2">
        <div className="frame-4">
          <div className="text-wrapper-6">email/username</div>
          <div className="group-2">
            <input className="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="text-wrapper-7">password</div>
          <div className="group-2">
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="text-wrapper-8">forgot password?</div>
          <div className="overlap-wrapper" onClick={handleLoginClick}>
            <div className="overlap-3">
              <div className="text-wrapper-9">login</div>
            </div>
          </div>
        </div>
        <div className="login-logo">
          <div className="overlap-4">
            <div className="text-wrapper-10">TreeTalk</div>
            <img className="remove-BG" alt="Remove BG" src="/img/remove-bg-369-1.png" />
          </div>
        </div>
        <div className="group-3">
          <div className="overlap-5">
            <div className="text-wrapper-11">Register Here</div>
          </div>
        </div>
      </div>
    </div>
  );
};
