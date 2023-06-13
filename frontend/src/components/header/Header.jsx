import { faChair, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useContext, useEffect, useState } from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { ViewContext } from "../../context/ViewContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { activeView, handleViewChange } = useContext(ViewContext);

  return (
    <div className="header">
      <div className="headerList">
        <Link
          to="/tables"
          onClick={() => handleViewChange("tables")}
          className={`headerListItem ${
            activeView === "tables" ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faChair} />
          <span>Table View</span>
        </Link>
        <Link
          to="/reservations"
          onClick={() => handleViewChange("reservations")}
          className={`headerListItem ${
            activeView === "reservations" ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>Reservation View</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
