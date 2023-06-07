import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './modals.css';
Modal.setAppElement('#root');

const TableModal = ({ isOpen, onClose, onSave, onDelete, table }) => {
  const [tableNum, setTableNum] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');

  useEffect(() => {
    if (table) {
      setTableNum(table.tableNum);
      setMaxCapacity(table.maxCapacity);
    } else {
      setTableNum('');
      setMaxCapacity('');
    }
  }, [table]);

  useEffect(() => {
    if (!isOpen) {
      setTableNum('');
      setMaxCapacity('');
    }
  }, [isOpen]);

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ tableNum, maxCapacity });
  };

  const handleDelete = () => {
    onDelete(table);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal">
      <h2>{table ? 'Edit Table' : 'Add Table'}</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Table Number:</label>
          <input
            type="text"
            value={tableNum}
            onChange={(e) => setTableNum(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Max Capacity:</label>
          <input
            type="number"
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit">{table ? 'Save' : 'Add'}</button>
          {table && (
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          )}
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TableModal;
