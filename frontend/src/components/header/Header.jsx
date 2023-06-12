import { faChair, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useContext, useEffect, useState } from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// import { Calendar } from "primereact/calendar";
// import { DateContext } from "../../context/DateContext";
import { ViewContext } from "../../context/ViewContext";

const Header = () => {
  // const [date, setDate] = useState(null);

  const { activeView, handleViewChange } = useContext(ViewContext);
  // const { dispatch } = useContext(DateContext);

  // const handleDateChange = (e) => {
  //   const selectedDate = e.value;
  //   setDate(selectedDate);

  //   if (selectedDate) {
  //     dispatch({ type: "NEW_DATE", payload: { date: selectedDate } });
  //   }
  // };

  return (
    <div className="header">
      <div className="headerList">
        <div
          className={`headerListItem ${
            activeView === "tables" ? "active" : ""
          }`}
          onClick={() => handleViewChange("tables")}
        >
          <FontAwesomeIcon icon={faChair} />
          <span>Table View</span>
        </div>
        <div
          className={`headerListItem ${
            activeView === "reservations" ? "active" : ""
          }`}
          onClick={() => handleViewChange("reservations")}
        >
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>Reservation View</span>
        </div>
        {/* <div className="p-float-label">
          <Calendar
            value={date}
            onChange={handleDateChange}
            dateFormat="yy/mm/dd"
            // minDate={new Date()}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
