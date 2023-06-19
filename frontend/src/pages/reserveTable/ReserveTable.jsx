import React, { useEffect, useState } from "react";
import "./reserveTable.css";
import { DateContext } from "../../context/DateContext";
import { Calendar } from "primereact/calendar";

const ReserveTable = () => {
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
        time += 30 * 60 * 1000; // Increment time by 30 minutes
      }

      return slots;
    };

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

  const timeSlotCount = timeSlots.length;
  const tableCount = tableData.length;

  return (
    <div>
      <div className="calendar">
        <h2>Choose Your Date:</h2>
        <Calendar dateFormat="yy/mm/dd" />
      </div>
      <div className="reserveTable">
        <div
          className="timeSlots"
          style={{
            gridRowEnd: `span ${timeSlotCount}`,
          }}
        >
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="timeSlot">
              {timeSlot}
            </div>
          ))}
        </div>
        <div
          className="tableNumbers"
          style={{
            gridColumnEnd: `span ${tableCount}`,
          }}
        >
          {tableData.map((table) => (
            <div key={table.id} className="tableNumber">
              {table.tableNum}
            </div>
          ))}
        </div>
        <div className="reservationCell">test</div>
        <div className="reservationCell asd">test2</div>
        <div className="reservationCell asdef">test3</div>
      </div>
    </div>
  );
};

export default ReserveTable;
