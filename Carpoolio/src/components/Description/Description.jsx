import { useContext, useState } from "react";
import { TripContext } from "@components/TripContext";
import { formResponseStyle, formResponseFocusStyle } from "@styles/styles";
import "./Description.css";

export default function Description({ isPreviewingTrip }) {
  const { formData, setFormData } = useContext(TripContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleInput = (event) => {
    event.target.style.height = "17.5px";
    event.target.style.height = `${event.target.scrollHeight}px`;
    setFormData({ ...formData, tripDescription: event.target.value });
  };

  const handleBlur = () => {
    setIsFocused(false);
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
      {!isPreviewingTrip || formData?.tripDescription ? (
        <textarea
          className="form-response"
          id="description-textarea"
          style={dynamicStyles}
          placeholder={formData?.tripDescription || "Add a description"}
          value={formData.tripDescription || ""}
          onChange={handleInput}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={isPreviewingTrip}
        ></textarea>
      ) : null}
    </>
  );
}
