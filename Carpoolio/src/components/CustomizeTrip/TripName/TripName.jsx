import "./TripName.css";

export default function TripName({ formData, setFormData, isCustomizingTrip }) {
  return (
    <>
      <input
        className="trip-title"
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
          border: isCustomizingTrip
            ? "none"
            : "2px solid rgba(255, 255, 255, 0.182)",
          borderRadius: isCustomizingTrip ? "0" : "5px",
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
