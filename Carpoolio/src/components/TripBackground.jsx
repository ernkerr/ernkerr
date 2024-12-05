import { useState, useContext } from "react";
import { TripContext } from "@/components/TripContext";
import "@/components/CustomizeTrip/CustomizeTrip.css";

// import color from "../assets/color.gif";
// import orange from "../assets/gifs/orange.gif";
// import red from "../assets/gifs/red.gif";
// import pink from "../assets/gifs/pinkliquid.gif";
// import moreclouds from "../assets/gifs/moreclouds.gif";
// import pixelcity from "../assets/gifs/pixelcity.gif";
// import roomService from "../assets/gifs/roomService.gif";
// import galaxy from "../assets/gifs/galaxy.gif";
// import wavelike from "../assets/gifs/wavelike.gif";
// import yellow from "../assets/gifs/yellow.gif";
// import purpleblobs from "../assets/gifs/purpleblobs.gif";

import bluegoo from "../assets/gifs/bluegoo.gif";
// patterns
// import stripes from "../assets/gifs/stripes.gif";

// nature
import clouds from "../assets/gifs/cloud.gif";
// import sunwater from "../assets/gifs/sunwater.gif";

// outerspace

// futuristic

import none from "../assets/gifs/none.png";

import crackingthecode from "../assets/gifs/crackingthecode.gif";
import marble from "../assets/gifs/marble.gif";
import orangesunset from "../assets/gifs/orangesunset.gif";
import city8bit from "../assets/gifs/8bitcity.gif";
import drivefast from "../assets/gifs/drivefast.gif";
import heatwave from "../assets/gifs/heatwave.gif";
import icy from "../assets/gifs/icy.gif";
import purple from "../assets/gifs/purple.gif";
import blue from "../assets/gifs/blue.gif";
import wavy from "../assets/gifs/circles.gif";
import palms from "../assets/gifs/palms.gif";
import pinkwaves from "../assets/gifs/pinkwaves.gif";
import silverliquid from "../assets/gifs/silverliquid.gif";
import warped from "../assets/gifs/warped.gif";

// import  from "../assets/gifs/.gif";
// import  from "../assets/gifs/.gif";
// import  from "../assets/gifs/.gif";

// import extremeBunnies from "../assets/gifs/extremeBunnies.gif";
import snowboardin from "../assets/gifs/snowboardin.gif";
import boarder from "../assets/gifs/boarder.gif";
import boardin from "../assets/gifs/boardin.gif";
import binary from "../assets/gifs/binary.gif";

// import  from "../assets/gifs/.gif";
// import  from "../assets/gifs/.gif";
// import  from "../assets/gifs/.gif";
// import  from "../assets/gifs/.gif";

const backgrounds = [
  { name: "blue goo", path: bluegoo },

  // {
  //   name: "extreme bunnies",
  //   path: extremeBunnies,
  //   scrim: "rgba(5, 242, 0253, 0.50)",
  // },

  // { name: "boardin", path: boardin, scrim: "rgba(0, 0, 0, 0.50)" },

  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },
  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },
  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },
  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },
  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },
  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },
  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },
  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },
  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },

  // batting order
  { name: "marble", path: marble, scrim: "rgba(0, 0, 0, 0.50)" },
  { name: "pink waves", path: pinkwaves },

  { name: "binary", path: binary, scrim: "rgba(0, 0, 0, 0.10)" },

  //
  //

  // snow
  { name: "boarder", path: boarder, scrim: "rgba(0, 0, 0, 0.10)" },
  {
    name: "snowboardin",
    path: snowboardin,
    scrim: "rgba(163, 215, 237, 0.70)",
  },

  // nature
  { name: "clouds", path: clouds, scrim: null },

  {
    name: "silver liquid",
    path: silverliquid,
    scrim: "rgba(110, 114, 114, 0.6)",
  },

  { name: "purple", path: purple },

  { name: "8bit city", path: city8bit, scrim: "rgba(98, 128, 249, 0.822)" },
  // { name: "purple aura", path: purpleaura },
  { name: "blue", path: blue, scrim: "rgba(26, 24, 93, 0.822)" },
  { name: "drive fast", path: drivefast },
  { name: "warped", path: warped },
  { name: "sunset", path: orangesunset },
  { name: "heatwave", path: heatwave, scrim: "rgba(145, 40, 10, 0.1)" },
  // { name: "yellow", path: yellow, scrim: "rgba(255, 225, 148, 0.90 )" },
  { name: "palms", path: palms },
  // { name: "water", path: sunwater },

  // { name: "moreclouds", path: moreclouds, scrim: null },
  { name: "icy", path: icy, scrim: null },
  {
    name: "matrix",
    path: crackingthecode,
    scrim: "rgba(0,0,0,0.9)",
  },
  { name: "black hole", path: wavy },

  { name: "none", path: none },
];

// {name: "none", }

// too fast / weird
// { name: "pink", path: pink },
// { name: "orange", path: orange },
// { name: "pixelcity", path: pixelcity, scrim: null },
// { name: "roomService", path: roomService, scrim: null },
// { name: "color", path: color },
// { name: "purpleblobs", path: purpleblobs },

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
