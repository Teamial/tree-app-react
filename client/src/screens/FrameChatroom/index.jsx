import React from 'react';
import ReactDOM from 'react-dom/client';
import { FrameChatroom } from './FrameChatroom';
import App from './App';
import './style.css'; // Adjust the path if necessary

const app = document.getElementById("app");
const root = ReactDOM.createRoot(document.getElementById('root')); // Correct usage for React 18+
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
root.render(<FrameChatroom />);