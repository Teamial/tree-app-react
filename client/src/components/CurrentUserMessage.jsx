import React from 'react';
import './CurrentUserMessage.css'; // Add styles specific to this component

const CurrentUserMessage = ({ text }) => {
  return (
    <div className="current-user-message">
      <div className="message-bubble current-user">
        <div className="message-text">{text}</div>
      </div>
      <div className="message-sender current-user">You</div>
    </div>
  );
};

export default CurrentUserMessage;
