import React, { useState, useEffect, useContext } from "react";
import "./reservationList.css";
import useFetch from "../../hooks/useFetch";
import ReservationModal from "../modals/ReservationModal";
import SuccessModal from "../modals/SuccessModal";
import axios from "axios";
import { DateContext } from "../../context/DateContext";
import format from "date-fns/format";
import { parseISO } from "date-fns";

const ReservationList = () => {
  const {
    data: reservations,
    loading,
    error,
    reFetch,
  } = useFetch("/reservations/");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    reFetch();
  }, []);

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
      const updatedTableNumber = selectedReservation.tableNumber; // Get the existing table number
      const updatedReservationData = {
        ...updatedReservation,
        tableNumber: updatedTableNumber, // Preserve the existing table number
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

  return (
    <div className="pList">
      {loading ? (
        "Loading..."
      ) : error ? (
        "An error occurred while fetching reservations. Please try again."
      ) : (
        <>
          {reservations.map((reservation) => (
            <div className="pListItem" key={reservation._id}>
              <div className="pListTitles">
                <h1>
                  Date:{" "}
                  {format(parseISO(reservation.reservationDate), "yyyy-MM-dd")}
                </h1>
                <h1>Party Size: {reservation.numPeople}</h1>
                <h1>Start Time: {reservation.startTime}</h1>
                <h1>End Time: {reservation.endTime}</h1>
                <h1>Name: {reservation.name}</h1>
                <h1>Phone: {reservation.phone}</h1>
                <h1>Email: {reservation.email}</h1>
                <h1>Table Booked: {reservation.tableNumber}</h1>
                <h1>Special Notes: {reservation.comments}</h1>
              </div>
              <div className="pListActions">
                <button onClick={() => handleEditReservation(reservation)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteReservation(reservation)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}
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
