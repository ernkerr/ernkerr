import "./Header.css";

import logo from "../../assets/img/logo2.png";

export default function Header() {
  return (
    <>
      <header>
        <a id="logo" href="/#home">
          <img className="logo" src={logo} alt="Carpoolio Logo" />
        </a>
        {/* <p className="carpoolio">carpoolio </p> */}
      </header>
    </>
  );
}
