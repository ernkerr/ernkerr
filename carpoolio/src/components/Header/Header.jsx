import "./Header.css";

import logo from "../../assets/img/logo2.png";

export default function Header() {
  return (
    <header>
      <img className="logo" src={logo} alt="Carpoolio Logo" />
      {/* <p className="carpoolio">carpoolio </p> */}
    </header>
  );
}
