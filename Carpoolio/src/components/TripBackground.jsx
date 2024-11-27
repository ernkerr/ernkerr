import { useState, useContext } from "react";
import { TripContext } from "@/components/TripContext";
import "@/components/CustomizeTrip/CustomizeTrip.css";

import none from "../assets/gifs/none.png";
import clouds from "../assets/gifs/cloud.gif";
import bluegoo from "../assets/gifs/bluegoo.gif";
// import color from "../assets/color.gif";
import crackingthecode from "../assets/gifs/crackingthecode.gif";
import marble from "../assets/gifs/marble.gif";
import orangesunset from "../assets/gifs/orangesunset.gif";
import city8bit from "../assets/gifs/8bitcity.gif";
import drivefast from "../assets/gifs/drivefast.gif";
import heatwave from "../assets/gifs/heatwave.gif";
import icy from "../assets/gifs/icy.gif";
import purple from "../assets/gifs/purple.gif";
// import orange from "../assets/gifs/orange.gif";
// import red from "../assets/gifs/red.gif";
// import pink from "../assets/gifs/pinkliquid.gif";
// import moreclouds from "../assets/gifs/moreclouds.gif";
// import pixelcity from "../assets/gifs/pixelcity.gif";
// import roomService from "../assets/gifs/roomService.gif";
import blue from "../assets/gifs/blue.gif";
import wavy from "../assets/gifs/circles.gif";
import palms from "../assets/gifs/palms.gif";
import pinkwaves from "../assets/gifs/pinkwaves.gif";
import purpleaura from "../assets/gifs/purpleaura.gif";
import silverliquid from "../assets/gifs/silverliquid.gif";
// import stripes from "../assets/gifs/stripes.gif";
import sunwater from "../assets/gifs/sunwater.gif";
import warped from "../assets/gifs/warped.gif";
// import galaxy from "../assets/gifs/galaxy.gif";
// import wavelike from "../assets/gifs/wavelike.gif";
// import yellow from "../assets/gifs/yellow.gif";
// import purpleblobs from "../assets/gifs/purpleblobs.gif";

const backgrounds = [
  // {name: "none", }

  // { name: "purpleblobs", path: purpleblobs },
  { name: "blue goo", path: bluegoo },
  // { name: "galaxy", path: galaxy },
  {
    name: "silver liquid",
    path: silverliquid,
    scrim: "rgba(130, 130, 130, 0.6)",
  },
  { name: "marble", path: marble, scrim: "rgba(0, 0, 0, 0.90)" },
  { name: "purple", path: purple },

  { name: "8bit city", path: city8bit, scrim: "rgba(98, 128, 249, 0.822)" },
  { name: "purple aura", path: purpleaura },
  { name: "blue", path: blue, scrim: "rgba(26, 24, 93, 0.822)" },
  { name: "drive fast", path: drivefast },
  { name: "warped", path: warped },
  { name: "sunset", path: orangesunset },
  { name: "heatwave", path: heatwave, scrim: "rgba(145, 40, 10, 0.1)" },
  // { name: "yellow", path: yellow, scrim: "rgba(255, 225, 148, 0.90 )" },
  { name: "palms", path: palms },
  { name: "water", path: sunwater },
  { name: "pink waves", path: pinkwaves },
  { name: "clouds", path: clouds, scrim: null },
  // { name: "moreclouds", path: moreclouds, scrim: null },
  { name: "icy", path: icy, scrim: null },
  {
    name: "matrix",
    path: crackingthecode,
    scrim: "rgba(0,0,0,0.9)",
  },
  { name: "black hole", path: wavy },
  { name: "none", path: none },

  // { name: "pink", path: pink },
  // { name: "orange", path: orange },
  // { name: "pixelcity", path: pixelcity, scrim: null },
  // { name: "roomService", path: roomService, scrim: null },

  // { name: "color", path: color },
];

export default function TripBackground({ isPreviewingTrip }) {
  const { formData, setFormData } = useContext(TripContext);
  const [isShowingBackgrounds, setIsShowingBackgrounds] = useState(false);

  const toggleBackgrounds = () => {
    setIsShowingBackgrounds((prev) => !prev);
  };

  function handleBackground(background) {
    setFormData({ ...formData, tripBackground: background });
  }

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
        onClick={toggleBackgrounds}
      >
        Change Background
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
    </>
  );
}
