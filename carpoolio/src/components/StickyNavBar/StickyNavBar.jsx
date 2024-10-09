import "./StickyNavBar.css";
import carpoolioLogo from "../../assets/fonts/carpoolioLogo.png";

export default function StickyNavBar({ showCreateTrip = false }) {
  return (
    <nav id="navbar">
      <a id="logo" href="/#home">
        <img src={carpoolioLogo} height="50px" />
      </a>
      {showCreateTrip && (
        <a id="create-trip" href="/trip/create">
          Create Trip
        </a>
      )}
    </nav>
  );
}
