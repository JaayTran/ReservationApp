import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ReservationModal = ({ isOpen, onClose, onSave, reservation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (isOpen && reservation) {
      setName(reservation.name || '');
      setPhone(reservation.phone || '');
      setEmail(reservation.email || '');
      setNumPeople(reservation.numPeople || '');
      setComments(reservation.comments || '');
    }
  }, [isOpen, reservation]);

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ name, phone, email, numPeople, comments });
    setName('');
    setPhone('');
    setEmail('');
    setNumPeople('');
    setComments('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <h2>{reservation ? 'Edit Reservation' : 'Add Reservation'}</h2>
      <form onSubmit={handleSave}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Number of People:
          <input
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Comments:
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">{reservation ? 'Save' : 'Add'}</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default ReservationModal;
