import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TableModal from "../modals/TableModal";
import ReservationModal from "../modals/ReservationModal";
import SuccessModal from "../modals/SuccessModal";
import "./tableList.css";
import useFetch from "../../hooks/useFetch";
import { DateContext } from "../../context/DateContext";
import { ViewContext } from "../../context/ViewContext";

const TableList = () => {
  const { data: tables, loading, error, reFetch } = useFetch("/tablenumbers/");

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [newTableData, setNewTableData] = useState({
    tableNum: "",
    maxCapacity: 0,
  });
  const [actionSuccess, setActionSuccess] = useState(false);

  const { adminView } = useContext(ViewContext);

  useEffect(() => {
    reFetch();
  }, []);

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
        tableNum: "",
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
    try {
      if (selectedTable) {
        await axios.put(`/tablenumbers/${selectedTable._id}`, tableData);
      } else {
        await axios.post("/tablenumbers/", tableData);
      }
      reFetch();
      handleCloseTableModal();
    } catch (error) {
      console.log("An error occurred while saving the table:", error);
    }
  };

  const handleDeleteTable = async (table) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this table?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/tablenumbers/${table._id}`);
        reFetch();
      } catch (error) {
        console.log("An error occurred while deleting the table:", error);
      }
    }
  };

  const handleOpenReservationModal = (table) => {
    setSelectedTable(table);
    setSelectedReservation(null);
    setReservationModalOpen(true);
    console.log(adminView);
  };

  const handleCloseReservationModal = () => {
    setSelectedTable(null);
    setSelectedReservation(null);
    setReservationModalOpen(false);
  };

  const handleSaveReservation = async (reservationData) => {
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
      setActionSuccess(true);
      reFetch();
    } catch (error) {
      console.log("An error occurred while saving the table:", error);
    }
  };

  const handleDeleteReservation = async (reservation) => {
    try {
      await axios.delete(`/reservations/${reservation._id}`);
      reFetch();
      handleCloseReservationModal();
    } catch (error) {
      console.log("An error occurred while saving the table:", error);
    }
  };

  const handleCloseSuccessModal = () => {
    setActionSuccess(false);
  };

  return (
    <div>
      <div className="pListHeader">
        <h2>Tables List</h2>
        <div className="pListActions">
          {adminView && (
            <button onClick={() => handleOpenTableModal(null)}>
              Add Table
            </button>
          )}
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="pList">
          {tables
            .sort((a, b) => {
              return a.tableNum.localeCompare(b.tableNum);
            })
            .map((table) => (
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

                <div className="pListActions">
                  {adminView && (
                    <div>
                      <button onClick={() => handleOpenTableModal(table)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteTable(table)}>
                        Delete
                      </button>
                    </div>
                  )}
                  <button onClick={() => handleOpenReservationModal(table)}>
                    Add Reservation
                  </button>
                </div>
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
      <SuccessModal isOpen={actionSuccess} onClose={handleCloseSuccessModal} />
    </div>
  );
};

export default TableList;
