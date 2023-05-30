import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { DateContext } from "../../context/DateContext";
Modal.setAppElement("#root");

const ReservationModal = ({ isOpen, onClose, onSave, reservation }) => {
  const { date } = useContext(DateContext);
  const [reservationDate, setReservationDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [comments, setComments] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (isOpen && reservation) {
      setReservationDate(reservation.date || "");
      setName(reservation.name || "");
      setPhone(reservation.phone || "");
      setEmail(reservation.email || "");
      setNumPeople(reservation.numPeople || "");
      setComments(reservation.comments || "");
      setStartTime(reservation.startTime || "");
      setEndTime(reservation.endTime || "");
    }
  }, [isOpen, reservation, date]);

  const calculateEndTime = (startTime) => {
    const [hours, minutes, initialPeriod] = startTime.split(/:| /);
    let startHours = parseInt(hours, 10);
    let startMinutes = parseInt(minutes, 10);
    let period = initialPeriod;

    let endHours = startHours + 2;
    let endMinutes = startMinutes;

    if (endHours >= 12 && period === "AM") {
      period = "PM";
      if (endHours > 12) {
        endHours -= 12;
      }
    } else if (endHours >= 12 && period === "PM") {
      period = "AM";
      if (endHours > 12) {
        endHours -= 12;
      }
    }

    if (endHours >= 24) {
      endHours -= 24;
      period = "AM";
    } else if (endHours === 12 && startHours === 12 && period === "AM") {
      // Special case for 12 AM
      period = "PM";
    }

    const formattedEndTime = `${endHours === 0 ? 12 : endHours}:${padZero(
      endMinutes
    )} ${period}`;
    return formattedEndTime;
  };

  const generateTimeOptions = () => {
    const startTime = 9 * 60; // 9 AM
    const endTime = 25 * 60 + 30; // 1:30 AM
    const interval = 15;

    const options = [];
    for (let time = startTime; time <= endTime; time += interval) {
      let hours = Math.floor(time / 60);
      const minutes = time % 60;
      let period = "AM";

      if (hours >= 12) {
        if (hours === 24 && minutes === 0) {
          hours = 12;
          period = "AM";
        } else if (hours >= 24) {
          hours -= 24;
          period = "AM";
        } else {
          period = "PM";
          if (hours > 12) {
            hours -= 12;
          }
        }
      }

      if (hours === 0 && minutes === 0) {
        hours = 12;
        period = "AM";
      }

      const formattedHours = hours === 0 ? 12 : hours;
      const formattedTime = `${formattedHours}:${padZero(minutes)} ${period}`;
      options.push(
        <option key={time} value={formattedTime}>
          {formattedTime}
        </option>
      );
    }
    return options;
  };

  const padZero = (num) => {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      reservationDate: date,
      name,
      phone,
      email,
      numPeople,
      comments,
      startTime,
      endTime,
    });
    setName("");
    setPhone("");
    setEmail("");
    setNumPeople("");
    setComments("");
    setStartTime("");
    setEndTime("");
    onClose();
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
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              setEndTime(calculateEndTime(e.target.value));
            }}
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
