import React, { useState, useEffect, useContext } from "react";
import "./reservationList.css";
import useFetch from "../../hooks/useFetch";
import ReservationModal from "../modals/ReservationModal";
import SuccessModal from "../modals/SuccessModal";
import axios from "axios";
import { DateContext } from "../../context/DateContext";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import { Calendar } from "primereact/calendar";

const ReservationList = () => {
  const {
    data: reservations,
    loading,
    error,
    reFetch,
  } = useFetch("/reservations/");
  const [status, setStatus] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [date, setDate] = useState(new Date());
  const { dispatch } = useContext(DateContext);
  const [tableData, setTableData] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    // Fetch table data from the database and set it in state
    const fetchTableData = async () => {
      try {
        const response = await fetch("/tablenumbers/");
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Generate time slots and set in state
    const generateTimeSlots = () => {
      const slots = [];
      let time = new Date().setHours(9, 0, 0, 0); // Set initial time to 9AM

      while (time <= new Date().setHours(21, 0, 0, 0)) {
        slots.push(formatTime(time));
        time += 30 * 60 * 1000; // Increment time by 15 minutes
      }

      return slots;
    };
    reFetch();
    fetchTableData();
    setTimeSlots(generateTimeSlots());
  }, []);

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleStatusChange = async (selectedStatus, reservationId) => {
    setStatus(selectedStatus);
    try {
      const updatedReservation = {
        ...selectedReservation,
        status: selectedStatus,
      };

      await axios.put(
        `/reservations/status/${reservationId}`,
        updatedReservation
      );
      reFetch();
    } catch (error) {
      console.log("An error occurred while updating the reservation:", error);
    }
  };

  const handleEditReservation = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleDeleteReservation = async (reservation) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `/reservations/${reservation._id}/${reservation.tableNumberId}`,
          setSuccessModalOpen(true)
        );
      } catch (error) {
        console.log("An error occurred while deleting the reservation:", error);
      } finally {
        reFetch();
      }
    }
  };

  const handleModalClose = () => {
    setSelectedReservation(null);
    setIsModalOpen(false);
  };

  const handleModalSave = async (updatedReservation) => {
    try {
      const updatedTableNumber = selectedReservation.tableNumber;
      const updatedReservationData = {
        ...updatedReservation,
        tableNumber: updatedTableNumber,
      };

      await axios.put(
        `/reservations/${selectedReservation._id}`,
        updatedReservationData
      );

      setSuccessModalOpen(true);
      reFetch();
    } catch (error) {
      console.log("An error occurred while updating the reservation:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.value;
    setDate(selectedDate);

    if (selectedDate) {
      dispatch({ type: "NEW_DATE", payload: { date: selectedDate } });
      setFilterDate(format(selectedDate, "yyyy-MM-dd"));
    } else {
      setFilterDate(""); // Reset the filter date if no date is selected
    }
  };

  const handleIndicatorClick = (reservation) => {
    if (selectedReservation === reservation) {
      // If the same reservation is clicked again, deselect it and hide the indicator
      setSelectedReservation(null);
    } else {
      // Otherwise, select the clicked reservation and show the indicator
      setSelectedReservation(reservation);
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    const reservationDate = format(
      parseISO(reservation.reservationDate),
      "yyyy-MM-dd"
    );
    return reservationDate;
  });

  const getReservationCell = (rowIndex, colIndex) => {
    const timeSlot = timeSlots[rowIndex];
    const tableNumber = tableData[colIndex].tableNum;
    const reservation = filteredReservations.find((r) => {
      const reservationDate = format(parseISO(r.reservationDate), "yyyy-MM-dd");
      return (
        r.tableNumber === tableNumber &&
        reservationDate === filterDate &&
        r.startTime === timeSlot
      );
    });

    if (reservation) {
      return (
        <td
          rowSpan={4}
          key={`${rowIndex}-${colIndex}`}
          className={`reservation-item ${reservation.status}`}
        >
          <div className="reservation-headers">
            <h1>Party Size: {reservation.numPeople}</h1>
            <h1>Name: {reservation.name}</h1>
            <h1>Phone: {reservation.phone}</h1>
            <h1>Email: {reservation.email}</h1>
            <h1>Table Booked: {reservation.tableNumber}</h1>
            <h1>Special Notes: {reservation.comments}</h1>
          </div>
          <div className="reservation-actions">
            <button onClick={() => handleEditReservation(reservation)}>
              Edit
            </button>
            <button onClick={() => handleDeleteReservation(reservation)}>
              Delete
            </button>
          </div>
          <div>
            <div className="reservation-actions">
              <button onClick={() => handleIndicatorClick(reservation)}>
                Change Status
              </button>
            </div>
            {/* Status Indicator Buttons */}
            {selectedReservation === reservation && (
              <div>
                <button
                  value={status}
                  className="seatedIndicator"
                  onClick={() => handleStatusChange("seated", reservation._id)}
                />
                <button
                  value={status}
                  className="pendingIndicator"
                  onClick={() => handleStatusChange("pending", reservation._id)}
                />
                <button
                  value={status}
                  className="cancelledIndicator"
                  onClick={() =>
                    handleStatusChange("cancelled", reservation._id)
                  }
                />
                <button
                  value={status}
                  className="neutralIndicator"
                  onClick={() => handleStatusChange("", reservation._id)}
                />
              </div>
            )}
          </div>
        </td>
      );
    } else {
      return (
        <td key={`${rowIndex}-${colIndex}`} className="reservation-cell"></td>
      );
    }
  };

  return (
    <div className="reservation-list-container">
      <Calendar
        value={date}
        onChange={handleDateChange}
        dateFormat="mm/dd/yy"
        showButtonBar
      />
      <table className="reservation-list">
        <thead>
          <tr>
            <th></th>
            {tableData.map((table, index) => (
              <th key={index} className="table-number">
                {table.tableNum}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot, rowIndex) => (
            <tr key={rowIndex}>
              <td className="time-slot">{timeSlot}</td>
              {tableData.map((_, colIndex) =>
                getReservationCell(rowIndex, colIndex)
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ReservationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        reservation={selectedReservation}
      />
      {successModalOpen && (
        <SuccessModal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ReservationList;
