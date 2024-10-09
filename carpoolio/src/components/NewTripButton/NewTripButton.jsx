import "../../pages/HomePage.css";

export default function NewTripButton({ children }) {
  return (
    <a href="/trip/create" className="new-trip">
      <button>{children}</button>
    </a>
  );
}
