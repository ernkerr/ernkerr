import Header from "../components/Header/Header.jsx";
import NewTripButton from "../components/NewTripButton/NewTripButton.jsx";
import MovingCar from "../components/MovingCar/MovingCar.jsx";

import logo from "../assets/img/logo.png";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <Header />

      <h1 className="font-face">carpoolio </h1>
      <h4 id="destination-message">
        because it's not <em>just</em> about the destination
      </h4>

      <h4 id="carpooling-message"> organized carpooling for your next trip </h4>
      <NewTripButton className="new-trip">Try It Out</NewTripButton>
      <MovingCar />
    </div>
  );
}
export default HomePage;

// api call example

// import { useEffect } from "react";
// import axios from "axios";

// const fetchAPI = async () => {
//   const response = await axios.get("http://localhost:8080/api"); // wait for axios to fetch this route
//   console.log(response.data.fruits);
// };

// useEffect(() => {
//   fetchAPI();
// }, []); // call the fetchAPI on first render of home page
