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
// import icy from "../assets/gifs/icy.gif";

import bluegoo from "../assets/gifs/bluegoo.gif";
// patterns
// import stripes from "../assets/gifs/stripes.gif";

// nature
// import clouds from "../assets/gifs/cloud.gif";
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

import purple from "../assets/gifs/purple.gif";
import blue from "../assets/gifs/blue.gif";
import wavy from "../assets/gifs/circles.gif";
import palms from "../assets/gifs/palms.gif";
import pinkwaves from "../assets/gifs/pinkwaves.gif";
// import silverliquid from "../assets/gifs/silverliquid.gif";
import warped from "../assets/gifs/warped.gif";

// import boardin from "../assets/gifs/boardin.gif";
// import extremeBunnies from "../assets/gifs/extremeBunnies.gif";
import snowboardin from "../assets/gifs/snowboardin.gif";
// import boarder from "../assets/gifs/boarder.gif";
import binary from "../assets/gifs/binary.gif";
import sunset from "../assets/gifs/sunset.gif";
import slowRoller from "../assets/gifs/slowRoller.gif";
import isWavy from "../assets/gifs/isWavy.gif";
import underwater from "../assets/gifs/underwater.gif";
// import waterfall from "../assets/gifs/waterfall.gif";
import green from "../assets/gifs/green.gif";
import blueWater from "../assets/gifs/blueWater.gif";
import darkWave from "../assets/gifs/darkWave.gif";
import pinkHighway from "../assets/gifs/pinkHighway.gif";
import overnight from "../assets/gifs/overnight.gif";
import butterflies from "../assets/gifs/butterflies.gif";
import starz from "../assets/gifs/starz.gif";
import cloudy from "../assets/gifs/cloudy.gif";
import snowy from "../assets/gifs/snowy.gif";
import justDrive from "../assets/gifs/justDrive.gif";
// import  from "../assets/gifs/.gif";

import snowTree from "../assets/gifs/snowTree.gif";
import pond from "../assets/gifs/pond.gif";
import shootingStar from "../assets/gifs/shootingStar.gif";
import waterfall from "../assets/gifs/waterfall.gif";
import orangeTrees from "../assets/gifs/orangeTrees.gif";

import mountain from "../assets/gifs/mountain.gif";

const backgrounds = [
  { name: "blue goo", path: bluegoo },
  { name: "isWavy", path: isWavy, scrim: null },
  { name: "just drive", path: justDrive, scrim: "rgba(0, 0, 0, 0.25)" },
  {
    name: "pinkHighway",
    path: pinkHighway,
    scrim: "rgba(178, 112, 144, 0.4)",
  },

  { name: "mountain", path: mountain, scrim: "rgba(56, 83, 148, 0.20)" },
  { name: "snow", path: snowTree, scrim: "rgba(56, 83, 148, 0.20)" },
  { name: "snowy", path: snowy, scrim: "rgba(107, 110, 111, 0.45)" },

  { name: "starz", path: starz, scrim: "rgba(0, 0, 0, 0.10)" },
  { name: "shooting star", path: shootingStar, scrim: "rgba(0, 0, 0, 0.10)" },
  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },
  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },
  // { name: "", path: , scrim: "rgba(0, 0, 0, 0.50)" },

  // batting order
  { name: "marble", path: marble, scrim: "rgba(0, 0, 0, 0.10)" },

  //
  //

  //
  //
  //
  //
  // nature
  { name: "pond", path: pond, scrim: "rgba(65, 110, 42, 0.70)" },
  { name: "cloudy", path: cloudy, scrim: "rgba(0, 0, 0, 0.10)" },
  { name: "waterfall", path: waterfall, scrim: "rgba(32, 42, 41, 0.35)" },

  { name: "underwater", path: underwater, scrim: null },
  { name: "slow roller", path: slowRoller, scrim: "rgba(0, 0, 0, 0.10)" },
  { name: "palms", path: palms },
  { name: "sunset", path: sunset, scrim: null },
  { name: "poolside", path: blueWater, scrim: null },

  { name: "heatwave", path: heatwave, scrim: "rgba(145, 40, 10, 0.1)" },
  { name: "orangeTrees", path: orangeTrees, scrim: "rgba(206, 102, 0, 0.20)" },
  { name: "pink .wav", path: pinkwaves },
  { name: "a sunset", path: orangesunset },

  // nature

  //snow

  {
    name: "snowboardin",
    path: snowboardin,
    scrim: "rgba(163, 215, 237, 0.70)",
  },
  // { name: "boarder", path: boarder, scrim: "rgba(0, 0, 0, 0.10)" },
  // {
  //   name: "silver liquid",
  //   path: silverliquid,
  //   scrim: "rgba(110, 114, 114, 0.6)",
  // },
  { name: "blue", path: blue, scrim: "rgba(26, 24, 93, 0.822)" },
  { name: "drive fast", path: drivefast },
  { name: "8bit city", path: city8bit, scrim: "rgba(98, 128, 249, 0.822)" },
  { name: "warped", path: warped },
  { name: "binary", path: binary, scrim: "rgba(0, 0, 0, 0.10)" },
  {
    name: "nums",
    path: crackingthecode,
    scrim: "rgba(0,0,0,0.9)",
  },
  { name: "green", path: green, scrim: "rgba(0, 0, 0, 0.50)" },
  // { name: "darkWave", path: darkWave, scrim: "rgba(0, 0, 0, 0.50)" },
  { name: "black hole", path: wavy },
  { name: "none", path: none },
];

//
//
//
//
//
//
// too fast / weird
//  // { name: "overnight", path: overnight, scrim: "rgba(0, 0, 0, 0.50)" },
// {
//   name: "butterflies",
//   path: butterflies,
//   scrim: "rgba(183, 111, 39, 0.732)",
// },
//  // { name: "waterfall", path: waterfall, scrim: "rgba(128, 147, 147, 0.50)" },
// { name: "purple", path: purple },
// { name: "pink", path: pink },
// { name: "orange", path: orange },
// { name: "pixelcity", path: pixelcity, scrim: null },
// { name: "roomService", path: roomService, scrim: null },
// { name: "color", path: color },
// { name: "purpleblobs", path: purpleblobs },
// { name: "water", path: sunwater },
// { name: "yellow", path: yellow, scrim: "rgba(255, 225, 148, 0.90 )" },
// { name: "moreclouds", path: moreclouds, scrim: null },
// { name: "icy", path: icy, scrim: null },
// { name: "purple aura", path: purpleaura },
// {
//   name: "extreme bunnies",
//   path: extremeBunnies,
//   scrim: "rgba(5, 242, 0253, 0.50)",
// },
// { name: "clouds", path: clouds, scrim: null },
// { name: "boardin", path: boardin, scrim: "rgba(0, 0, 0, 0.50)" },

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
