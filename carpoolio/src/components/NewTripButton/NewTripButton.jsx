import "../../pages/HomePage.css";

export default function NewTripButton({ children, ...rest }) {
  return (
    <a href="/trip/create" style={{ textDecoration: "none" }}>
      <button {...rest}>{children}</button>
    </a>
  );
}
