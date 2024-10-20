import Link from "next/link";
import "./CarpoolioSpinner.css";
import spinnerImg from "../../assets/CarpoolioSpinner.png";

export default function CarpoolioSpinner() {
  return (
    <Link className="spin" href="/trip/create">
      <img
        src={spinnerImg}
        alt="Spinning"
        style={{ width: "150px", height: "auto" }}
      />
    </Link>
  );
}
