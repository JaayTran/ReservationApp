import React, { useState, useEffect, useContext } from 'react';
import './reservationList.css';
import useFetch from '../../hooks/useFetch';
import ReservationModal from '../modals/ReservationModal';
import SuccessModal from '../modals/SuccessModal';
import axios from 'axios';
import { DateContext } from '../../context/DateContext';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';
import { Calendar } from 'primereact/calendar';

const ReservationList = () => {
  const {
    data: reservations,
    loading,
    error,
    reFetch,
  } = useFetch('/reservations/');
  const [status, setStatus] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [filterOption, setFilterOption] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [filterTable, setFilterTable] = useState('');
  const [date, setDate] = useState(null);
  const { dispatch } = useContext(DateContext);
  const [tableOptions, setTableOptions] = useState([]);
  const [showIndicator, setShowIndicator] = useState('');

  useEffect(() => {
    reFetch();
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await fetch('/tablenumbers');
      if (response.ok) {
        const data = await response.json();
        const options = data.map((table) => ({
          id: table._id,
          number: table.tableNum,
          reservations: table.reservations, // Array of reservation IDs
        }));
        setTableOptions(options);
      } else {
        console.error('Failed to fetch table data');
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
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
      setShowIndicator(false);
      reFetch();
    } catch (error) {
      console.log('An error occurred while updating the reservation:', error);
    }
  };

  const handleIndicatorClick = (reservation) => {
    if (selectedReservation === reservation) {
      // If the same reservation is clicked again, deselect it and hide the indicator
      setSelectedReservation(null);
      setShowIndicator(false);
    } else {
      // Otherwise, select the clicked reservation and show the indicator
      setSelectedReservation(reservation);
      setShowIndicator(true);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.value;
    setDate(selectedDate);

    if (selectedDate) {
      dispatch({ type: 'NEW_DATE', payload: { date: selectedDate } });
      setFilterDate(format(selectedDate, 'yyyy-MM-dd'));
    } else {
      setFilterDate(''); // Reset the filter date if no date is selected
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
      fetchTableData();
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

  // Filter reservations based on the selected filter option
  let filteredReservations = reservations;
  if (filterOption === 'date') {
    filteredReservations = reservations.filter(
      (reservation) =>
        format(parseISO(reservation.reservationDate), 'yyyy-MM-dd') ===
        filterDate
    );
  } else if (filterOption === 'table') {
    const selectedTable = tableOptions.find(
      (table) => table.number === filterTable
    );
    if (selectedTable) {
      filteredReservations = selectedTable.reservations.map((reservationId) => {
        return reservations.find(
          (reservation) => reservation._id === reservationId
        );
      });
    }
  } else if (filterOption === 'tableDate') {
    const selectedTable = tableOptions.find(
      (table) => table.number === filterTable
    );
    if (selectedTable) {
      filteredReservations = selectedTable.reservations
        .map((reservationId) =>
          reservations.find((reservation) => reservation._id === reservationId)
        )
        .filter(
          (reservation) =>
            format(parseISO(reservation.reservationDate), 'yyyy-MM-dd') ===
            filterDate
        );
    } else {
      filteredReservations = [];
    }
  }

  // Group reservations by date
  const reservationsByDate = {};
  filteredReservations.forEach((reservation) => {
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
      <div className="pListTitles">
        <div>
          <label>Filter Reservations</label>
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="all">All</option>
            <option value="date">All by Date</option>
            <option value="table">Table</option>
            <option value="tableDate">Table by Date</option>
          </select>
        </div>

        {filterOption === 'date' && (
          <Calendar
            value={date}
            onChange={handleDateChange}
            dateFormat="yy/mm/dd"
          />
        )}
        {filterOption === 'table' && (
          <div>
            <label>Table Number:</label>
            <select
              value={filterTable}
              onChange={(e) => setFilterTable(e.target.value)}
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
        {filterOption === 'tableDate' && (
          <div>
            {/* <input
              type="text"
              placeholder="Enter table number"
              value={filterTable}
              onChange={(e) => setFilterTable(e.target.value)}
            /> */}
            <div>
              <label>Table Number:</label>
              <select
                value={filterTable}
                onChange={(e) => setFilterTable(e.target.value)}
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
            <Calendar
              value={date}
              onChange={handleDateChange}
              dateFormat="yy/mm/dd"
            />
          </div>
        )}
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
                      <div
                        className={`pListItem ${reservation.status}`}
                        key={reservation._id}
                      >
                        <div className="pListTitles">
                          <h1>Start Time: {reservation.startTime}</h1>
                          <h1>Party Size: {reservation.numPeople}</h1>
                          <h1>Name: {reservation.name}</h1>
                          <h1>Phone: {reservation.phone}</h1>
                          <h1>Email: {reservation.email}</h1>
                          <h1>Table Booked: {reservation.tableNumber}</h1>
                          <h1>Special Notes: {reservation.comments}</h1>
                        </div>
                        <div>
                          <div className="pListActions">
                            <button
                              onClick={() => handleIndicatorClick(reservation)}
                            >
                              Change Status
                            </button>
                          </div>

                          {selectedReservation === reservation && (
                            <div>
                              <button
                                value={status}
                                className="seatedIndicator"
                                onClick={() =>
                                  handleStatusChange('seated', reservation._id)
                                }
                              />
                              <button
                                value={status}
                                className="pendingIndicator"
                                onClick={() =>
                                  handleStatusChange('pending', reservation._id)
                                }
                              />
                              <button
                                value={status}
                                className="cancelledIndicator"
                                onClick={() =>
                                  handleStatusChange(
                                    'cancelled',
                                    reservation._id
                                  )
                                }
                              />
                              <button
                                value={status}
                                className="neutralIndicator"
                                onClick={() =>
                                  handleStatusChange('', reservation._id)
                                }
                              />
                            </div>
                          )}
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
