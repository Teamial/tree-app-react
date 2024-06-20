import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-dom/client';
import { FrameChatroom } from './FrameChatroom';
import { FrameLogin } from '../FrameLogin/FrameLogin';
import './style.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: isLoggedIn ? <FrameChatroom username={username} /> : <FrameLogin onLogin={handleLogin} />,
    },
    {
      path: '/frameu95chatroom',
      element: <FrameChatroom username={username} />,
    },
    {
      path: '/frameu95login',
      element: <FrameLogin onLogin={handleLogin} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;