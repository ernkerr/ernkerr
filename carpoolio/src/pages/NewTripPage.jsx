import NewTripForm from "./NewTripForm.jsx";
import StickyNavBar from "../components/StickyNavBar/StickyNavBar.jsx";
import "../components/NewTripForm/NewTripForm.css";

export default function NewTripPage() {
  return (
    <>
      <StickyNavBar />
      <NewTripForm />
    </>
  );
}
