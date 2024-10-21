import "./StickyNavBar.css";
import CarpoolioLogo from "../CarpoolioLogo/CarpoolioLogo.jsx";

export default function StickyNavBar({ showCreateTrip = false }) {
  return (
    <nav id="navbar">
      {/* // logo in top left corner */}
      <a id="logo" href="/#home">
        <CarpoolioLogo />
        {/* <img src={carpoolioLogo} height="50px" /> */}
      </a>
      {showCreateTrip && (
        <a id="create-trip" href="/trip/create">
          Create Trip
        </a>
      )}
    </nav>
  );
}
