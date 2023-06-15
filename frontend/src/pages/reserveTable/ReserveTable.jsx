import React, { useEffect, useState } from "react";
import "./reserveTable.css";
import { DateContext } from "../../context/DateContext";
import { Calendar } from "primereact/calendar";

const ReserveTable = () => {
  const [tableData, setTableData] = useState([]);

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

    fetchTableData();
  }, []);

  const timeSlots = generateTimeSlots();

  return (
    <div>
      <div className="calendar">
        <h2>Choose Your Date:</h2>
        <Calendar dateFormat="yy/mm/dd" />
      </div>
      <div className="reserveTable">
        <div className="timeSlots">
          {/* Render time slots along the y-axis */}
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="timeSlot">
              {timeSlot}
            </div>
          ))}
        </div>
        <div className="tableCell">test</div>
        <div className="tableGrid">
          {/* Render table numbers along the x-axis */}
          {tableData
            .sort((a, b) => {
              return a.tableNum.localeCompare(b.tableNum);
            })
            .map((table) => (
              <div key={table.id} className="tableNumber">
                {table.tableNum}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Function to generate time slots from 9AM to 9PM in 30 minute increments
const generateTimeSlots = () => {
  const timeSlots = [];
  let time = new Date().setHours(9, 0, 0, 0); // Set initial time to 9AM

  while (time <= new Date().setHours(21, 0, 0, 0)) {
    timeSlots.push(formatTime(time));
    time += 30 * 60 * 1000; // Increment time by 30 minutes
  }

  return timeSlots;
};

// Function to format time in HH:MM AM/PM format
const formatTime = (time) => {
  return new Date(time).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default ReserveTable;
