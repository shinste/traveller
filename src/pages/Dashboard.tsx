import NavBar from "../components/NavBar";
import * as CONSTANTS from "../constants/navBar";
import Calendar from "../components/Calendar";
import useDashboardPage from "../hooks/useDashboardPage";
const Dashboard = () => {
  const { events, setDateChosen, dateChosen, eventsRef } = useDashboardPage();
  return (
    <div className="Page-default">
      <div id="Dashboard-main-div">
        <NavBar page={CONSTANTS.TITLE_DASHBOARD} />

        <Calendar
          events={events}
          setDateChosen={setDateChosen}
          dateChosen={dateChosen}
          originalEventDates={eventsRef.current}
        />
      </div>
    </div>
  );
};

export default Dashboard;
