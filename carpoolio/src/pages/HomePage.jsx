import Header from "../components/Header/Header.jsx";
import NewTripButton from "../components/NewTripButton/NewTripButton.jsx";
import MovingCar from "../components/MovingCar/MovingCar.jsx";
import "./HomePage.css";
import { useEffect } from "react";
import axios from "axios";

function HomePage() {
  // api call
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api"); // wait for axios to fetch this route
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []); // call the fetchAPI on first render of home page

  return (
    <div className="home-page">
      <Header />
      <NewTripButton>Try It Out</NewTripButton>
      <MovingCar />
    </div>
  );
}
export default HomePage;
