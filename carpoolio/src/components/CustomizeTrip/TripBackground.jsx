import { useState } from "react";

import "./CustomizeTrip.css";
import clouds from "../../assets/cloud.gif";
import bluegoo from "../../assets/bluegoo.gif";
import color from "../../assets/color.gif";
import crackingthecode from "../../assets/crackingthecode.gif";
import marble from "../../assets/marble.gif";
import orangesunset from "../../assets/orangesunset.gif";

const backgrounds = [
  // {name: "none", }
  { name: "clouds", path: clouds, scrim: null },
  { name: "bluegoo", path: bluegoo, scrim: null },
  { name: "color", path: color },
  { name: "marble", path: marble, scrim: "rgba(20, 20, 20, 0.7)" },
  { name: "orangesunset", path: orangesunset },
  { name: "crackingthecode", path: crackingthecode, scrim: "rgba(0,0,0,0.8)" },
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
      <button onClick={toggleBackgrounds}>Backgrounds</button>
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
