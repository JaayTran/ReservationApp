import React from "react";
import Modal from "react-modal";
import "./modals.css";
Modal.setAppElement("#root");
const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <h3>Action Successful!</h3>
        <button className="close" onClick={onClose}>
          X
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
