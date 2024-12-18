import Header from "../components/Header/Header.jsx";
import NewTripButton from "../components/NewTripButton/NewTripButton.jsx";
import MovingCar from "../components/MovingCar/MovingCar.jsx";
import { TripContext } from "../components/TripContext.jsx";
import { glowBtn } from "@styles/styles";
import { useContext } from "react";

import logo from "../assets/img/logo.png";
import "./HomePage.css";

function HomePage() {
  const { formData } = useContext(TripContext);
  return (
    <div className="home-page">
      <Header />
      <h1 className="font-face">carpoolio </h1>
      <h4 id="heading"> organized carpooling for your next trip </h4>
      <h4 id="sub-heading">
        because it's not <em>just</em> about the destination
      </h4>
      <NewTripButton
        className="font-face call-to-action-btn"
        style={glowBtn(formData)}
      >
        Try It Out
      </NewTripButton>
      <MovingCar />
      {/*           */}
      {/* <Loader />  */}
      {/*           */}
      {/*           */}
      {/*           */}
      {/*  Pain     */}
      {/*  Is this you?  */}
      {/*  Make the current way of doing something sound painful, emotional language ,make them think: how do I fix this?  */}
      {/*   Carpoolio, the app for ___, finally.  *immediate benefit*       */}
      {/*           */}
      {/*           */}
      {/* Product   */}
      {/* Show, don't tell */}
      {/* See it in action! USPs, show animation from signups through to outcomes  */}
      {/* Add comparison language like “the only product to… ” or use comparison
      tables, Add interactive demos, product animations, walkthroughs and case studies to evidence what you’re saying */}
      {/*           */}
      {/*           */}
      {/*           */}
      {/* Social Proof  */}
      {/* USPs, outcomes, quantify benefits, include reviews, evidence your claims  */}
      {/* tools: Senja.io */}
      {/*           */}
      {/*           */}
      {/*           */}
      {/* Another Call to Action (!)  */}
      {/* <NewTripButton
        className="font-face call-to-action-btn"
        style={glowBtn(formData)}
      >
        Try It Out
      </NewTripButton> */}
      {/*           */}
      {/*           */}
      {/*           */}
      {/* Adress Objections */}
      {/* guarentees, FAQs, Evidence of trustworthiness (decrease friction and doubt)  */}
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

// P2: If it's too hard to get setup: Offer templates, how to guides, and concierge migration
