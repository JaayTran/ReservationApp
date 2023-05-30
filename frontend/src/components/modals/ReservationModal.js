import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { DateContext } from "../../context/DateContext";
Modal.setAppElement("#root");
const ReservationModal = ({ isOpen, onClose, onSave, reservation }) => {
  const { date } = useContext(DateContext);
  const [reservationDate, setReservationDate] = useState(date);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [comments, setComments] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (isOpen && reservation) {
      setReservationDate(reservation.date || "");
      setName(reservation.name || "");
      setPhone(reservation.phone || "");
      setEmail(reservation.email || "");
      setNumPeople(reservation.numPeople || "");
      setComments(reservation.comments || "");
      setStartDate(reservation.startDate || "");
      setEndDate(reservation.endDate || "");
    }
  }, [isOpen, reservation, date]);

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      reservationDate,
      name,
      phone,
      email,
      numPeople,
      comments,
      startDate,
      endDate,
    });
    setReservationDate("");
    setName("");
    setPhone("");
    setEmail("");
    setNumPeople("");
    setComments("");
    setStartDate("");
    setEndDate("");
    onClose();
  };

  const calculateEndDate = (startDate) => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);
    return endDateTime.toLocaleString();
  };

  const generateTimeOptions = () => {
    const startTime = 12 * 60;
    const endTime = 22 * 60;
    const interval = 15;

    const options = [];
    for (let time = startTime; time <= endTime; time += interval) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const formattedTime = `${padZero(hours)}:${padZero(minutes)}`;
      options.push(
        <option key={time} value={formattedTime}>
          {formattedTime}
        </option>
      );
    }

    return options;
  };

  const padZero = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <h2>{reservation ? "Edit Reservation" : "Add Reservation"}</h2>
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
        <label>
          Time of Reservation:
          <select
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          >
            <option value="">Select Time</option>
            {generateTimeOptions()}
          </select>
        </label>
        <br />
        <button type="submit">{reservation ? "Save" : "Add"}</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default ReservationModal;
