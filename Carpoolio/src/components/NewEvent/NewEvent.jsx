// Progress Bar Step 1

import { useContext } from "react";
import { TripContext } from "@components/TripContext";
import bluegoo from "../../assets/bluegoo.gif";

import Destination from "../CustomizeTrip/Destination/Destination";

import "./NewEvent.css";

export default function NewEvent() {
  const { formData, setFormData } = useContext(TripContext);

  return (
    <>
      <div className="form-question-container">
        <h1 className="form-question">Where to?</h1>
        <Destination />
      </div>
    </>
  );
}
