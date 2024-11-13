import { useContext } from "react";
import { TripContext } from "@/components/TripContext";
import "./Description.css";

export default function Description({ isPreviewingTrip }) {
  const { formData, setFormData } = useContext(TripContext);

  const handleInput = (event) => {
    // event.target.style.height = "4dvh";
    event.target.style.height = `${event.target.scrollHeight}px`;
    setFormData({ ...formData, tripDescription: event.target.value });
  };

  return (
    <>
      {!isPreviewingTrip || formData.tripDescription ? (
        <textarea
          className="form-response"
          // id="description-textarea"
          placeholder={
            formData?.tripDescription || "Tell us more about the trip"
          }
          value={formData.tripDescription || ""}
          onChange={handleInput}
          disabled={isPreviewingTrip}
          // style={{
          //   height: "4dvh",
          //   background: formData?.tripBackground?.scrim || "transparent",
          //   border: isPreviewingTrip
          //     ? "2px solid transparent"
          //     : "2px solid rgba(255, 255, 255, 0.182)",
          //   borderRadius: isPreviewingTrip ? "0" : "5px",
          // }}
        ></textarea>
      ) : null}
    </>
  );
}
