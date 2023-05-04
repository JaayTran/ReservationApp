import { faChair, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useState } from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Calendar } from "primereact/calendar";

const Header = () => {
  const [date, setDate] = useState(null);

  return (
    <div className="header">
      <div className="headerList">
        <div className="headerListItem active">
          <FontAwesomeIcon icon={faChair} />
          <span>Table View</span>
        </div>
        <div className="headerListItem">
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>Reservation View</span>
        </div>
        <div className="p-float-label">
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            dateFormat="dd/mm/yy"
            showButtonBar
          />
          <label htmlFor="birth_date">Select Date</label>
        </div>
      </div>
    </div>
  );
};

export default Header;
