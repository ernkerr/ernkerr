import axios from "axios";
import Header from "../components/Header/Header.jsx";
import NewTripButton from "../components/NewTripButton/NewTripButton.jsx";
import MovingCar from "../components/MovingCar/MovingCar.jsx";
import "./HomePage.css";
import { useEffect } from "react";

function HomePage() {
  // Example backend request!
  useEffect(() => {
    axios.get("/api/trip").then((res) => console.log(res.data));
  }, []);

  return (
    <div className="home-page">
      <Header />
      <NewTripButton>Try It Out</NewTripButton>
      <MovingCar />
    </div>
  );
}
export default HomePage;
