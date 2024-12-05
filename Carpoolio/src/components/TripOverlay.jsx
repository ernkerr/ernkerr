import { useState, useContext } from "react";
import { TripContext } from "@/components/TripContext";
import "@/components/CustomizeTrip/CustomizeTrip.css";

import snow from "../assets/gifs/snow.gif"

export default function TripOverlay({ isPreviewingTrip }) {
  const { formData, setFormData } = useContext(TripContext);
  const [isShowingOverlays, setIsShowingOverlays] = useState(false);

  const toggleOverlays = () => {
    setIsShowingOverlays((prev) => !prev);
  };

  function handleOverlays(overlay) {
    setFormData({ ...formData, tripOverlay: overlay });
  }

  const overlays = [
    { name: "snow", path: snow},
  ]

  return (
    <>
      <button
        style={{
          background: isPreviewingTrip
            ? "transparent"
            : formData?.tripBackground?.scrim || undefined,
          pointerEvents: isPreviewingTrip ? "none" : "auto",
        }}
        className="style-btns"
        onClick={toggleOverlays}
      >
        overlay
      </button>
      {isShowingOverlays && (
        <div className="background-container">
          {overlays.map((overlay) => (
            <div
              key={overlay.name}
              className="background-option"
              onClick={() => handleOverlays(overlay)}
            >
              <img
                src={overlay.path}
                alt={overlay.name}
                className="background-image"
              />
              <span>{overlay.name}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
