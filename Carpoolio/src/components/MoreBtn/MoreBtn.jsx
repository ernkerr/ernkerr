import { useEffect, useState, useContext, useRef } from "react";
import { TripContext } from "@components/TripContext";
import { formResponseStyle, glowBtn } from "@styles/styles";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
// import "react-sidebar-pro/dist/styles.css"; // Import default styles

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
  const [isShowingMore, setIsShowingMore] = useState(false);

  const toggleMore = () => {
    setIsShowingMore((prev) => !prev);
  };

  const handleClose = () => {
    setIsShowingMore(false);
  };

  return (
    <>
      {/* <button onClick={toggleMore} className="more-btn"> */}
      {/* <img className="more-icon" src={threeDots} alt="More options" /> */}
      {/* </button> */}

      <label className="arrow-container">
        <input type="checkbox" checked={isShowingMore} onChange={toggleMore} />
        <svg
          className="chevron-right"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
        </svg>
        <svg
          className="chevron-down"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
        </svg>
      </label>

      {isShowingMore && (
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
              <button className="option-btn">Edit Trip</button>
              <EditBtn
                isAdmin={isAdmin}
                isPreviewingTrip={isPreviewingTrip}
                togglePreview={togglePreview}
              />

              {/* <InviteBtn
                isVisible={isInviteModalVisible}
                setIsVisible={setIsInviteModalVisible}
              /> */}

              <button className="option-btn">New Trip</button>
              <button className="option-btn">FAQ</button>
            </div>
          </div>
          {/* <button onClick={handleClose}>Close</button> */}
        </>
      )}
    </>
  );
}
