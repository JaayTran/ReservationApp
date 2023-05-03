import { faChair, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';
const Header = () => {
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
      </div>
    </div>
  );
};

export default Header;
