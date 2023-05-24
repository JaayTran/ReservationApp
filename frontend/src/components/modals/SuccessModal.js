import React from 'react';
import './modals.css';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div className="page-background" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-content">
          <h3>Action Successful!</h3>
          <button className="close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
