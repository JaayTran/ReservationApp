import React, { useState, useEffect, useContext } from 'react';
import './reservationList.css';
import useFetch from '../../hooks/useFetch';
import ReservationModal from '../modals/ReservationModal';
import SuccessModal from '../modals/SuccessModal';
import axios from 'axios';
import { DateContext } from '../../context/DateContext';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';

const ReservationList = () => {
  const {
    data: reservations,
    loading,
    error,
    reFetch,
  } = useFetch('/reservations/');
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
      'Are you sure you want to delete this reservation?'
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `/reservations/${reservation._id}/${reservation.tableNumberId}`,
          setSuccessModalOpen(true)
        );
      } catch (error) {
        console.log('An error occurred while deleting the reservation:', error);
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
      console.log('An error occurred while updating the reservation:', error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':');
    const [rawMinutes, period] = minutes.split(' ');
    let totalMinutes = parseInt(hours, 10) * 60 + parseInt(rawMinutes, 10);

    if (period === 'PM' && hours !== '12') {
      totalMinutes += 12 * 60; // Add 12 hours for PM times (except 12 PM)
    }

    return totalMinutes;
  };

  // Group reservations by date
  const reservationsByDate = {};
  reservations.forEach((reservation) => {
    const reservationDate = format(
      parseISO(reservation.reservationDate),
      'yyyy-MM-dd'
    );
    if (!reservationsByDate[reservationDate]) {
      reservationsByDate[reservationDate] = [];
    }
    reservationsByDate[reservationDate].push(reservation);
  });

  return (
    <div>
      <h2 className="pListTitles">Reservations:</h2>
      <div>
        <label>Filter Reservations</label>
        <select>
          <option value="all">All</option>
          <option value="date">All by Date</option>
          <option value="table">Table</option>
          <option value="table">Table by Date</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {Object.entries(reservationsByDate)
            .sort(([dateA], [dateB]) => {
              return new Date(dateA) - new Date(dateB);
            })
            .map(([date, reservations]) => (
              <div key={date}>
                <h2 className="pListDate">Date: {date}</h2>
                <div className="pList">
                  {reservations
                    .sort((a, b) => {
                      const timeA = convertTimeToMinutes(a.startTime);
                      const timeB = convertTimeToMinutes(b.startTime);
                      return timeA - timeB;
                    })
                    .map((reservation) => (
                      <div className="pListItem" key={reservation._id}>
                        <div className="pListTitles">
                          <h1>Party Size: {reservation.numPeople}</h1>
                          <h1>Start Time: {reservation.startTime}</h1>
                          <h1>Name: {reservation.name}</h1>
                          <h1>Phone: {reservation.phone}</h1>
                          <h1>Email: {reservation.email}</h1>
                          <h1>Table Booked: {reservation.tableNumber}</h1>
                          <h1>Special Notes: {reservation.comments}</h1>
                        </div>
                        <div className="pListActions">
                          <button
                            onClick={() => handleEditReservation(reservation)}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReservation(reservation)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
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
