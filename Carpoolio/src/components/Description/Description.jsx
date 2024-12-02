import { useContext } from "react";
import { TripContext } from "@components/TripContext";
import "./Description.css";

export default function Description({ isPreviewingTrip }) {
  const { formData, setFormData } = useContext(TripContext);

  const handleInput = (event) => {
    event.target.style.height = "17.5px";
    event.target.style.height = `${event.target.scrollHeight}px`;
    setFormData({ ...formData, tripDescription: event.target.value });
  };

  return (
    <>
      {!isPreviewingTrip || formData?.tripDescription ? (
        <textarea
          className={`form-response ${isPreviewingTrip ? "disabled" : ""}`}
          id="description-textarea"
          placeholder={formData?.tripDescription || "Add a description"}
          value={formData.tripDescription || ""}
          onChange={handleInput}
          disabled={isPreviewingTrip}
          style={{
            background: isPreviewingTrip
              ? "transparent"
              : formData?.tripBackground?.scrim || undefined,
            pointerEvents: isPreviewingTrip ? "none" : "auto",
          }}
        ></textarea>
      ) : null}
    </>
  );
}
