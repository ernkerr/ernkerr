import "./Header.css";
import CarpoolioSpinner from "../CarpoolioSpinner/CarpoolioSpinner";

export default function Header() {
  return (
    <header>
      <h1 className="font-face">carpoolio </h1>
      <h4 id="destination-message">
        because it's not <em>just</em> about the destination
      </h4>
      <CarpoolioSpinner />
      <h4 id="carpooling-message"> organized carpooling for your next trip </h4>
    </header>
  );
}
