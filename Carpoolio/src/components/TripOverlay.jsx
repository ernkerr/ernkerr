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

import stars from "../assets/gifs/stars.gif";
import twinklingStars from "../assets/gifs/twinklingStars.gif";
// import snowflake from "../assets/gifs/snowflake.gif";
// import clouds1 from "../assets/gifs/clouds1.gif";
// import stars2 from "../assets/gifs/stars2.gif";
import sparklers from "../assets/gifs/sparklers.gif";
import goldfish from "../assets/gifs/goldfish.gif";
// import glitter from "../assets/gifs/glitter.gif";
import rain2 from "../assets/gifs/snow2.gif";
// import lightning from "../assets/gifs/lightning.gif";
// import snowflakes from "../assets/gifs/snowflakes.gif";

// import  from "../assets/gifs/.gif";
// import  from "../assets/gifs/.gif";

// make sure this is saving to formData (!)

export default function TripOverlay({ isPreviewingTrip }) {
  const { formData, setFormData } = useContext(TripContext);
  const [isShowingOverlays, setIsShowingOverlays] = useState(false);

  const toggleOverlays = () => {
    setIsShowingOverlays((prev) => !prev);
  };

  function handleOverlays(overlay) {
    if (overlay.name === "none") {
      setFormData({ ...formData, tripOverlay: null }); // clear the overlay
    } else {
      setFormData({ ...formData, tripOverlay: overlay });
    }
  }

  const overlays = [
    { name: "none", path: null },
    { name: "snow", path: snow },
    // { name: "sparkles", path: sparkles },
    { name: "late", path: late },
    // { name: "fire", path: fire },
    // { name: "squiddy ", path: squiddy },
    { name: "rain", path: rain },
    // { name: "clouds", path: clouds },

    { name: "stars", path: stars },
    { name: "twinklingStars", path: twinklingStars },
    // { name: "snowflakes", path: snowflakes },
    // { name: "clouds1", path: clouds1 },
    // { name: "stars2", path: stars2 },
    { name: "sparklers", path: sparklers },
    { name: "goldfish", path: goldfish },
    // { name: "glitter", path: glitter },
    { name: "rain2", path: rain2 },
    // { name: "lightning", path: lightning },
    // { name: "snowflakes", path: snowflakes },

    // { name: "", path:  },
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
              {overlay.name === "none" ? (
                <div
                  className="background-option"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                  }}
                >
                  None
                </div>
              ) : (
                <>
                  <img
                    src={overlay.path}
                    alt={overlay.name}
                    className="background-image"
                  />
                  <span>{overlay.name}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Conditionally render the overlay */}
      {formData?.tripOverlay && (
        <div
          className="overlay-wrapper"
          style={{
            backgroundImage: `url(${formData.tripOverlay.path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animationDuration: `${formData?.tripOverlay?.speed || 10}s`,
          }}
        />
      )}
    </>
  );
}
