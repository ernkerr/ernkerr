import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo2.png";

export default function Header() {
  return (
    <>
      <header>
        <Link id="logo" to="/">
          <img className="logo" src={logo} alt="Carpoolio Logo" />
        </Link>
        {/* <p className="carpoolio">carpoolio </p> */}
      </header>
    </>
  );
}
