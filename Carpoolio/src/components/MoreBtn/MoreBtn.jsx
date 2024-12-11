import { useEffect, useState, useContext, useRef } from "react";
import { TripContext } from "@components/TripContext";
import { formResponseStyle, glowBtn, glowBorder } from "@styles/styles";
import { Twirl as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

import "./MoreBtn.css";
import threeDots from "../../assets/img/three-dots.png";
import InviteBtn from "../InviteBtn/InviteBtn";
import EditBtn from "../EditBtn/EditBtn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// more
// modal ?
// style options: background, overlay, glow color

export default function MoreBtn({
  isAdmin,
  isPreviewingTrip,
  togglePreview,
  isInviteModalVisible,
  setIsInviteModalVisible,
}) {
  const { formData, setFormData } = useContext(TripContext);
  const [isOpen, setOpen] = useState(false);

  const handleEditTrip = () => {
    setOpen(false);
    togglePreview();
  };

  return (
    <>
      <div className="hamburger-container">
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          size={25}
          distance="md"
          direction="left"
          rounded
          label="Show menu"
        />
      </div>

      {/* style={glowBorder(formData)} */}

      {isOpen && (
        <>
          <div className="side-bar-container">
            <div className="option-container">
              <button className="option-btn">Login</button>
              <button
                className="option-btn"
                onClick={() => setIsInviteModalVisible(true)}
              >
                Share Trip
              </button>
              <button className="option-btn" onClick={handleEditTrip}>
                Edit Trip
              </button>

              <button className="option-btn">New Trip</button>
              <button className="option-btn">FAQ</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
