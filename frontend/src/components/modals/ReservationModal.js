import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { format } from "date-fns";

Modal.setAppElement("#root");

const ReservationModal = ({ isOpen, onClose, onSave, reservation }) => {
  const [reservationDate, setReservationDate] = useState(new Date());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tableNum, setTableNum] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [comments, setComments] = useState("");
  const [startTime, setStartTime] = useState("");
  const [tableOptions, setTableOptions] = useState([]);

  useEffect(() => {
    if (isOpen && reservation) {
      setReservationDate(
        reservation.reservationDate
          ? new Date(reservation.reservationDate)
          : new Date()
      );
      setName(reservation.name || "");
      setPhone(reservation.phone || "");
      setEmail(reservation.email || "");
      setTableNum(reservation.tableNumber || "");
      setNumPeople(reservation.numPeople || "");
      setComments(reservation.comments || "");
      setStartTime(reservation.startTime || "");
    }

    // Fetch table data from the database and update table options
    fetchTableData();
  }, [isOpen, reservation]);

  const fetchTableData = async () => {
    try {
      // Make an API call to fetch table data from the database
      const response = await fetch("/tablenumbers"); // Replace with your API endpoint

      if (response.ok) {
        const data = await response.json();
        // Assuming the response data is an array of table objects with 'id' and 'tableNum' properties
        const options = data.map((table) => ({
          id: table._id,
          number: table.tableNum, // Updated property name
        }));
        setTableOptions(options);
      } else {
        console.error("Failed to fetch table data");
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const generateTimeOptions = () => {
    const openingHours = 9 * 60; // 9 AM
    const closingHours = 21 * 60; // 9 PM
    const interval = 15;

    const options = [];
    for (let time = openingHours; time <= closingHours; time += interval) {
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
      reservationDate,
      name,
      phone,
      email,
      tableNum,
      numPeople,
      comments,
      startTime,
    });
    setReservationDate(new Date());
    setName("");
    setPhone("");
    setEmail("");
    setTableNum("");
    setNumPeople("");
    setComments("");
    setStartTime("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <h2>{reservation ? "Edit Reservation" : "Add Reservation"}</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {reservation && (
          <div className="form-group">
            <label htmlFor="tableNum">Table Number:</label>
            <select
              id="tableNum"
              value={tableNum}
              onChange={(e) => setTableNum(e.target.value)}
            >
              <option value="">Select Table</option>
              {tableOptions
                .sort((a, b) => {
                  return a.number.localeCompare(b.number);
                })
                .map((table) => (
                  <option key={table.id} value={table.number}>
                    {table.number}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="numPeople">Number of People:</label>
          <input
            type="number"
            id="numPeople"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="startTime">Day of Reservation:</label>
          <Calendar
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            dateFormat="yy/mm/dd"
            required
            // minDate={new Date()}
          />
        </div>

        <div className="form-group">
          <label htmlFor="startTime">Time of Reservation:</label>
          <select
            id="startTime"
            value={startTime}
            required
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="">Select Time</option>
            {generateTimeOptions()}
          </select>
        </div>
        <div className="form-buttons">
          <button type="submit">{reservation ? "Save" : "Add"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default ReservationModal;
