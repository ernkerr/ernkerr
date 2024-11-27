import { useContext, useState, forwardRef } from "react";
import { TripContext } from "@components/TripContext";

const TripName = forwardRef(
  ({ isPreviewingTrip, onTripNameUpdate, onKeyDown }, ref) => {
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
          className={`form-response ${error ? "error" : ""} ${
            isPreviewingTrip ? "disabled" : ""
          }`}
          style={{
            background: isPreviewingTrip
              ? "transparent"
              : formData?.tripBackground?.scrim || undefined,
            pointerEvents: isPreviewingTrip ? "none" : "auto",
          }}
          id="trip-name"
          ref={ref}
          type="text"
          required
          placeholder={"Give your trip a name"}
          value={formData.tripName || ""}
          disabled={isPreviewingTrip}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onBlur={handleBlur} // trigger validation when input loses focus
        />
        {error && <p className="error-message">{error}</p>}
      </>
    );
  }
);

export default TripName;
