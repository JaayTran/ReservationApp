import {
  faChair,
  faCalendarDays,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { ViewContext } from "../../context/ViewContext";

const Header = () => {
  const { activeView, handleViewChange, adminView } = useContext(ViewContext);
  const location = useLocation();

  const { handleLogout } = useContext(ViewContext);

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
        {adminView && (
          <div onClick={handleLogout} className="headerListItem">
            <FontAwesomeIcon icon={faPowerOff} /> <span>Logout Admin View</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
