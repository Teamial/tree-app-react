import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './style.css'; // Adjust path if needed
import './chatroom-responsive.css'; // For media queries

const socket = io('http://localhost:3001');

export const FrameChatroom = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chat message', { user: username, text: input });
      setInput('');
    }
  };

  return (
    <div className="frame-chatroom">
      <header className="header">
        <img className="icon-arrow-ios-back" alt="Icon arrow ios back" src="/img/icon-arrow-ios-back.png" />
        <div className="group-chat-name">Group Chat Name</div>
        <img className="icon-person-outline" alt="Icon person outline" src="/img/icon-person-outline.png" />
      </header>
      <div className="chat-body">
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.user === username ? 'current-user' : 'other-user'}`}>
              <div className="message-bubble">{msg.text}</div>
              <div className="message-sender">{msg.user === username ? 'You' : msg.user}</div>
            </div>
          ))}
        </div>
        <div className="send-text">
          <div className="input-group">
            <input
              className="type-here"
              placeholder="Type here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="send-button" onClick={sendMessage}>send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
