import { faChair, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { ViewContext } from "../../context/ViewContext";

const Header = () => {
  const { activeView, handleViewChange } = useContext(ViewContext);
  const location = useLocation();

  return (
    <div className="header">
      <div className="headerList">
        <Link
          to="/tables"
          onClick={() => handleViewChange("tables")}
          className={`headerListItem ${
            location.pathname === "/tables" && activeView === "tables"
              ? "active"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faChair} />
          <span>Table View</span>
        </Link>
        <Link
          to="/reservations"
          onClick={() => handleViewChange("reservations")}
          className={`headerListItem ${
            location.pathname === "/reservations" &&
            activeView === "reservations"
              ? "active"
              : ""
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
