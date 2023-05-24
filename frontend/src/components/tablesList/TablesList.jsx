import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableModal from '../modals/TableModal';
import ReservationModal from '../modals/ReservationModal';
import SuccessModal from '../modals/SuccessModal';
import './tableList.css';

const TableList = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [newTableData, setNewTableData] = useState({
    tableNum: '',
    maxCapacity: 0,
  });
  const [reservationSuccess, setReservationSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/tablenumbers/');
      setTables(res.data);
    } catch (error) {
      setError('An error occurred while fetching tables. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenTableModal = (table) => {
    setSelectedTable(table);
    if (table) {
      // If editing an existing table, populate the form with the table data
      setNewTableData({
        tableNum: table.tableNum,
        maxCapacity: table.maxCapacity,
      });
    } else {
      // If adding a new table, reset the form data to empty values
      setNewTableData({
        tableNum: '',
        maxCapacity: 0,
      });
    }
    setTableModalOpen(true);
  };

  const handleCloseTableModal = () => {
    setSelectedTable(null);
    setTableModalOpen(false);
  };

  const handleSaveTable = async (tableData) => {
    setLoading(true);
    try {
      if (selectedTable) {
        await axios.put(`/tablenumbers/${selectedTable._id}`, tableData);
      } else {
        await axios.post('/tablenumbers/', tableData);
      }
      fetchData();
      handleCloseTableModal();
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTable = async (table) => {
    setLoading(true);
    try {
      await axios.delete(`/tablenumbers/${table._id}`);
      fetchData();
    } catch (error) {
      setError('An error occurred while deleting the table. Please try again.');
    } finally {
      setLoading(false);
      handleCloseTableModal();
    }
  };

  const handleOpenReservationModal = (table) => {
    setSelectedTable(table);
    setSelectedReservation(null);
    setReservationModalOpen(true);
  };

  const handleCloseReservationModal = () => {
    setSelectedTable(null);
    setSelectedReservation(null);
    setReservationModalOpen(false);
  };

  const handleSaveReservation = async (reservationData) => {
    setLoading(true);
    try {
      if (selectedReservation) {
        // Edit existing reservation
        await axios.put(
          `/reservations/${selectedReservation._id}`,
          reservationData
        );
      } else {
        // Add new reservation
        const tableId = selectedTable._id; // Get the ID of the selected table
        reservationData.tableNumber = selectedTable.tableNum; // Append the table number to the reservation data
        await axios.post(`/reservations/${tableId}`, reservationData);
      }
      setReservationSuccess(true);
      fetchData();
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReservation = async (reservation) => {
    setLoading(true);
    try {
      await axios.delete(`/reservations/${reservation._id}`);
      fetchData();
      handleCloseReservationModal();
    } catch (error) {
      setError(
        'An error occurred while deleting the reservation. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setReservationSuccess(false);
  };

  return (
    <div>
      <h2>Tables List</h2>
      <button onClick={() => handleOpenTableModal(null)}>Add Table</button>

      {/* Display tables */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="pList">
          {tables.map((table) => (
            <div className="pListItem" key={table._id}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZRzBL62-pJDUluAgcMC2joOfMh6nNS-Pdg&usqp=CAU"
                alt=""
                className="pListImg"
              />
              <div className="pListTitles">
                <h1>Table Number: {table.tableNum}</h1>
                <h2>Max Capacity: {table.maxCapacity}</h2>
              </div>
              <button onClick={() => handleOpenTableModal(table)}>Edit</button>
              <button onClick={() => handleDeleteTable(table)}>Delete</button>
              <button onClick={() => handleOpenReservationModal(table)}>
                Add Reservation
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Table Modal */}
      <TableModal
        isOpen={tableModalOpen}
        onClose={handleCloseTableModal}
        onSave={handleSaveTable}
        onDelete={handleDeleteTable}
        table={selectedTable}
      />

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={handleCloseReservationModal}
        onSave={handleSaveReservation}
        onDelete={handleDeleteReservation}
        reservation={selectedReservation}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={reservationSuccess}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
};

export default TableList;
