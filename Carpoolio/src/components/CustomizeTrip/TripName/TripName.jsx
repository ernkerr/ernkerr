import { useContext } from "react";
import { TripContext } from "@components/TripContext";
import "./TripName.css";

export default function TripName({ isPreviewingTrip }) {
  const { formData, setFormData } = useContext(TripContext);
  return (
    <>
      <input
        className="trip-title"
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
          border: isPreviewingTrip
            ? "2px solid transparent"
            : "2px solid rgba(255, 255, 255, 0.182)",
          borderRadius: isPreviewingTrip ? "0" : "5px",
        }}
        type="text"
        required
        placeholder={formData.tripName || "Untitled Trip"}
        onChange={(event) => {
          setFormData({ ...formData, tripName: event.target.value });
        }}
      ></input>
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
