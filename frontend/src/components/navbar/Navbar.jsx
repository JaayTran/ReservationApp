import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <Link to="/">Reservations App</Link>
        </span>
        <div className="navItems"></div>
      </div>
    </div>
  );
};

export default Navbar;
