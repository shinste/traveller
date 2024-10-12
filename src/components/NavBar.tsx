import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import { Navigate } from "react-router-dom";
import * as CONSTANTS from "../constants/navBar";
import { Link } from "react-router-dom";
import { useTripsContext } from "../context";

interface NavBarProps {
  page: string;
}
const NavBar: React.FC<NavBarProps> = ({ page }) => {
  const { userLoggedIn, currentUser } = useAuth();
  const { updateTrips } = useTripsContext();

  const handleSignout = () => {
    updateTrips([]);
    doSignOut();
  };
  return (
    <div id="Nav-div">
      {!userLoggedIn && <Navigate to={"/"} replace={true} />}
      <nav
        className="navbar navbar-expand-lg"
        id="Navigation"
        style={{ borderRadius: "0rem" }}
      >
        {/* <a className="navbar-brand" href="#"> */}
        <Link to="/dashboard" className="nav-item nav-link">
          <h3 id="Nav-title">traveller</h3>
        </Link>
        {/* </a> */}
        <div className="collapse navbar-collapse" id="NavBarButtons">
          <div className="navbar-nav" id="NavBarFlex">
            <Link to="/dashboard" className="nav-item nav-link">
              <p
                className="Nav-button"
                style={{
                  fontWeight:
                    CONSTANTS.TITLE_DASHBOARD === page ? "bold" : "normal",
                }}
              >
                dashboard
              </p>
            </Link>
            <Link to="/calendar" className="nav-item nav-link">
              <p
                className="Nav-button"
                style={{
                  fontWeight:
                    CONSTANTS.TITLE_CALENDAR === page ? "bold" : "normal",
                }}
              >
                calendar
              </p>
            </Link>
            <Link to="/trips" className="nav-item nav-link">
              <p
                className="Nav-button"
                style={{
                  fontWeight:
                    CONSTANTS.TITLE_TRIPS === page ? "bold" : "normal",
                }}
              >
                trips
              </p>
            </Link>
            <button className="Bland-button" onClick={handleSignout}>
              log out {currentUser?.email}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
