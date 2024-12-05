import { useContext, useState, forwardRef } from "react";
import { TripContext } from "@components/TripContext";
import { formResponseStyle, formResponseFocusStyle } from "@styles/styles";

const TripName = forwardRef(
  ({ isPreviewingTrip, onTripNameUpdate, onKeyDown }, ref) => {
    const { formData, setFormData } = useContext(TripContext);
    const [error, setError] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = () => {
      setIsFocused(false); // remove focus style
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

    const handleFocus = () => {
      setIsFocused(true);
    };

    const dynamicStyles = {
      ...formResponseStyle({ formData, isPreviewingTrip }),
      ...(isFocused && formResponseFocusStyle(formData)), // add focus styles dynamically
    };

    return (
      <>
        <input
          className={`form-response ${error ? "error" : ""} `}
          style={dynamicStyles} // apply dynamic styles
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
          onFocus={handleFocus} // enable focus state (set glow color)
        />
        {error && <p className="error-message">{error}</p>}
      </>
    );
  }
);

export default TripName;
