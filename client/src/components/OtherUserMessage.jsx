import React from 'react';
import './OtherUserMessage.css'; // Add styles specific to this component

const OtherUserMessage = ({ text, user }) => {
  return (
    <div className="other-user-message">
      <div className="message-bubble">
        <div className="message-text">{text}</div>
      </div>
      <div className="message-sender">{user}</div>
    </div>
  );
};

export default OtherUserMessage;
