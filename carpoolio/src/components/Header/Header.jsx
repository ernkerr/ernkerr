import './Header.css'
import CarpoolioSpinner from '../CarpoolioSpinner/CarpoolioSpinner';

export default function Header() {
    return (
      <header>
        <h1>carpoolio </h1>
        <h4>because it's not just about the destination</h4>
        <br></br>
        <CarpoolioSpinner />
        <br></br>
        <br></br>
        <h4>organized carpooling for your next trip </h4>
      </header>
    );
}