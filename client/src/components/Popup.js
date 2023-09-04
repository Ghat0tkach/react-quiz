import React from "react";

function MessagePopup({ isOpen, message, onClose }) {
  return isOpen ? (
    <div className="message-popup-overlay">
      <div className="message-popup-content">
        <div className="message-popup-message">{message}
      </div>
        <button className="btn btn-ui" onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  ) : null;
}

export default MessagePopup;
