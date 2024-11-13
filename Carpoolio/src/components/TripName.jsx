import { useContext, useState } from "react";
import { TripContext } from "@components/TripContext";

export default function TripName({ isPreviewingTrip, onTripNameUpdate }) {
  const { formData, setFormData } = useContext(TripContext);
  const [error, setError] = useState("");

  const handleBlur = () => {
    if (!formData.tripName) {
      setError("Trip name is required");
    } else {
      setError("");
    }
  };

  const handleChange = (event) => {
    if (!isPreviewingTrip) {
      setFormData({ ...formData, tripName: event.target.value });
      if (event.target.value) setError("");
      // pass the destination up to parent
      if (onTripNameUpdate) {
        onTripNameUpdate(event.target.value);
      }
    }
  };
  return (
    <>
      <input
        // className={`trip-name ${isPreviewingTrip ? "disabled" : ""}`}
        className="form-response"
        id="trip-name"
        // style={{
        //   border: isPreviewingTrip
        //     ? "2px solid transparent"
        //     : error
        //     ? "2px solid red"
        //     : "2px solid rgba(255, 255, 255, 0.182)",
        // }}

        type="text"
        required
        placeholder={"Give your trip a name.."}
        value={formData.tripName || ""}
        disabled={isPreviewingTrip}
        onChange={handleChange}
        onBlur={handleBlur} // trigger validation when input loses focus
      />
      {/* {error && <p className="error-message">{error}</p>} */}
    </>
  );
}

// on hover (required)

// <input
//   key={`row1-seat${index}`}
//   value={seatNames.row1[index] || ""}
//   onChange={(event) => handleSeatClick("row1", index, event)}
//   className="seat-input"
// />;
