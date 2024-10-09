import { useState } from "react";

import "./CustomizeTrip.css";
import clouds from "../../assets/cloud.gif";
import bluegoo from "../../assets/bluegoo.gif";
// import color from "../../assets/color.gif";
import crackingthecode from "../../assets/crackingthecode.gif";
import marble from "../../assets/marble.gif";
import orangesunset from "../../assets/gifs/orangesunset.gif";
import city8bit from "../../assets/gifs/8bitcity.gif";
// import koi8bit from "../../assets/gifs/8bitkoi.gif";
// import colorful from "../../assets/gifs/colorful.gif";
import drivefast from "../../assets/gifs/drivefast.gif";
import heatwave from "../../assets/gifs/heatwave.gif";
import icy from "../../assets/gifs/icy.gif";
import moreclouds from "../../assets/gifs/moreclouds.gif";
// import pixelcity from "../../assets/gifs/pixelcity.gif";
// import roomService from "../../assets/gifs/roomService.gif";
import purple from "../../assets/gifs/purple.gif";
import orange from "../../assets/gifs/orange.gif";
// import red from "../../assets/gifs/red.gif";
import pink from "../../assets/gifs/pinkliquid.gif";

const backgrounds = [
  // {name: "none", }
  { name: "blue goo", path: bluegoo },
  { name: "marble", path: marble, scrim: "rgba(0, 0, 0, 0.90)" },
  { name: "purple", path: purple },
  { name: "8bit city", path: city8bit, scrim: null },
  { name: "drive fast", path: drivefast },
  { name: "pink", path: pink },
  { name: "orange", path: orange },
  { name: "orange sunset", path: orangesunset },
  // { name: "8bit Koi", path: koi8bit, scrim: null },
  // { name: "colorful 2", path: colorful, scrim: null },

  { name: "heatwave", path: heatwave, scrim: null },

  { name: "clouds", path: clouds, scrim: null },
  { name: "moreclouds", path: moreclouds, scrim: null },
  { name: "icy", path: icy, scrim: null },
  // { name: "pixelcity", path: pixelcity, scrim: null },
  // { name: "roomService", path: roomService, scrim: null },

  // { name: "color", path: color },

  {
    name: "cracking the code",
    path: crackingthecode,
    scrim: "rgba(0,0,0,0.8)",
  },
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
