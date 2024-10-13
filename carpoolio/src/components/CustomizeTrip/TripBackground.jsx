import { useState } from "react";

import "./CustomizeTrip.css";
import clouds from "../../assets/gifs/cloud.gif";
import bluegoo from "../../assets/bluegoo.gif";
// import color from "../../assets/color.gif";
import crackingthecode from "../../assets/gifs/crackingthecode.gif";
import marble from "../../assets/gifs/marble.gif";
import orangesunset from "../../assets/gifs/orangesunset.gif";
import city8bit from "../../assets/gifs/8bitcity.gif";
import drivefast from "../../assets/gifs/drivefast.gif";
import heatwave from "../../assets/gifs/heatwave.gif";
import icy from "../../assets/gifs/icy.gif";

import purple from "../../assets/gifs/purple.gif";
// import orange from "../../assets/gifs/orange.gif";
// import red from "../../assets/gifs/red.gif";
// import pink from "../../assets/gifs/pinkliquid.gif";
// import moreclouds from "../../assets/gifs/moreclouds.gif";
// import pixelcity from "../../assets/gifs/pixelcity.gif";
// import roomService from "../../assets/gifs/roomService.gif";

// import road from "../../assets/gifs/road.gif";

const backgrounds = [
  // {name: "none", }
  // { name: "road", path: road },
  { name: "blue goo", path: bluegoo },
  { name: "marble", path: marble, scrim: "rgba(0, 0, 0, 0.90)" },
  { name: "purple", path: purple },
  { name: "8bit city", path: city8bit, scrim: "rgba(98, 128, 249, 0.822)" },
  { name: "drive fast", path: drivefast },
  { name: "orange sunset", path: orangesunset },
  { name: "heatwave", path: heatwave, scrim: "rgba(255, 252, 252, 0.25)" },
  { name: "clouds", path: clouds, scrim: null },
  // { name: "moreclouds", path: moreclouds, scrim: null },
  { name: "icy", path: icy, scrim: null },

  {
    name: "cracking the code",
    path: crackingthecode,
    scrim: "rgba(0,0,0,0.9)",
  },

  // { name: "pink", path: pink },
  // { name: "orange", path: orange },
  // { name: "pixelcity", path: pixelcity, scrim: null },
  // { name: "roomService", path: roomService, scrim: null },

  // { name: "color", path: color },
];

export default function TripBackground({ formData, setFormData }) {
  const [isShowingBackgrounds, setIsShowingBackgrounds] = useState(false);

  const toggleBackgrounds = () => {
    setIsShowingBackgrounds((prev) => !prev);
  };

  function handleBackground(background) {
    setFormData({ ...formData, tripBackground: background });
  }

  return (
    <div>
      <button
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
        }}
        className="customize-trip-btns"
        onClick={toggleBackgrounds}
      >
        Backgrounds
      </button>
      {isShowingBackgrounds && (
        <div className="background-container">
          {backgrounds.map((background) => (
            <div
              key={background.name}
              className="background-option"
              onClick={() => handleBackground(background)}
            >
              <img
                src={background.path}
                alt={background.name}
                className="background-image"
              />
              <span>{background.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
