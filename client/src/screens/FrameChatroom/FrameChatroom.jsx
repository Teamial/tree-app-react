import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './style.css'; // Adjust path if needed

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
      <div className="div">
        <div className="overlap">
          <div className="background" />
          <div className="send-text">
            <div className="overlap-group">
              <div className="rectangle" />
              <img className="frame" alt="Frame" src="/img/frame-4.png" />
              <div className="group">
                <div className="group-wrapper">
                  <div className="overlap-group-wrapper">
                    <div className="overlap-group-2">
                      <img className="img" alt="Rectangle" src="/img/rectangle-6.png" />
                      <div className="text-wrapper" onClick={sendMessage}>send</div>
                    </div>
                  </div>
                </div>
              </div>
              <input
                className="type-here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
            </div>
          </div>
          <div className="frame-2">
            {messages.map((msg, index) => (
              <div key={index} className={`div-wrapper ${msg.user === username ? 'current-user' : ''}`}>
                <div className="text-wrapper-2">{msg.text}</div>
                <div className={`message-sender ${msg.user === username ? 'current-user' : ''}`}>{msg.user}</div>
              </div>
            ))}
          </div>
        </div>
        <header className="header">
          <input className="group-chat-name" />
          <img className="icon-person-outline" alt="Icon person outline" src="/img/icon-person-outline.png" />
          <img className="icon-arrow-ios-back" alt="Icon arrow ios back" src="/img/icon-arrow-ios-back.png" />
        </header>
      </div>
    </div>
  );
};
