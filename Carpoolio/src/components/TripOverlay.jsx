import { useState, useContext } from "react";
import { TripContext } from "@/components/TripContext";
import "@/components/CustomizeTrip/CustomizeTrip.css";

import snow from "../assets/gifs/snow.gif";
import sparkles from "../assets/gifs/sparkles.gif";

import late from "../assets/gifs/late.gif";
import fire from "../assets/gifs/fire.gif";
import squiddy from "../assets/gifs/squiddy.gif";
import rain from "../assets/gifs/rain.gif";
import none from "../assets/gifs/none.png";

// make sure this is saving to formData (!)

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
    { name: "none", path: none },
    { name: "snow", path: snow },
    // { name: "sparkles", path: sparkles },
    { name: "late", path: late },
    // { name: "fire", path: fire },
    // { name: "squiddy ", path: squiddy },
    { name: "rain", path: rain },
    // { name: "clouds", path: clouds },
  ];

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
        Change Overlay
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