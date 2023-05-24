import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reservationList.css';
import useFetch from '../../hooks/useFetch';
import ReservationModal from '../modals/ReservationModal';
import SuccessModal from '../modals/SuccessModal';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/reservations/');
      setReservations(res.data);
    } catch (error) {
      setError(
        'An error occurred while fetching reservations. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditReservation = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleDeleteReservation = async (reservation) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this reservation?'
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `/reservations/${reservation._id}/${reservation.tableId}`
        );
        setReservations((prevReservations) =>
          prevReservations.filter(
            (prevReservation) => prevReservation._id !== reservation._id
          )
        );
      } catch (error) {
        console.log('An error occurred while deleting the reservation:', error);
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
      setReservations((prevReservations) =>
        prevReservations.map((prevReservation) =>
          prevReservation._id === selectedReservation._id
            ? { ...prevReservation, ...updatedReservationData } // Merge the updated reservation data
            : prevReservation
        )
      );
    } catch (error) {
      console.log('An error occurred while updating the reservation:', error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="pList">
      {loading ? (
        'Loading...'
      ) : (
        <>
          {reservations.map((reservation) => (
            <div className="pListItem" key={reservation._id}>
              <div className="pListTitles">
                <h1>Party Size: {reservation.numPeople}</h1>
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
