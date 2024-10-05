import Header from "../components/Header/Header.jsx";
import NewTripButton from "../components/NewTripButton/NewTripButton.jsx";
import MovingCar from "../components/MovingCar/MovingCar.jsx";
import StickyNavBar from "../components/StickyNavBar/StickyNavBar.jsx";
import bluegoo from "../assets/bluegoo.gif";
import "./HomePage.css"; // Ensure this is at the top of your file

function HomePage() {
  return (
    <div className="home-page">
      <StickyNavBar showCreateTrip />
      <Header />
      <NewTripButton>Try It Out</NewTripButton>
      <MovingCar />
    </div>
  );
}
export default HomePage;
