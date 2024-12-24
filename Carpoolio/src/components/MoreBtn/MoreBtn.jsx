import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();

  const { formData, setFormData } = useContext(TripContext);
  const { tripId } = useParams();
  const [isOpen, setOpen] = useState(false);

  const handleEditTrip = () => {
    setOpen(false);
    togglePreview();
    console.log("from MoreBtn tripId: ", tripId);
    console.log("URL: ", `${API_BASE_URL}/api/auth/google?tripId=${tripId}`);
  };

  const handleShareTrip = () => {
    setOpen(false);
    setIsInviteModalVisible(true);
  };

  // make sure that tripId is being sent as apart of the query string during the login request
  // const handleLogin = () => {
  //   // console.log("from MoreBtn tripId: ", tripId);
  //   // const tripId = formData.tripId;
  //   // window.location.href = `${API_BASE_URL}/api/auth/google`; // Redirect to your backend login endpoint
  //   window.location.href = `${API_BASE_URL}/api/auth/google?tripId=${tripId}`;
  //   console.log("from MoreBtn tripId: ", tripId);
  // };

  // trigger a redirect to the OAuth google login route with the tripId passed as a query parameter
  const handleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google?tripId=${tripId}`;
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
              <button className="option-btn" onClick={handleLogin}>
                Login
              </button>

              <button className="option-btn" onClick={handleShareTrip}>
                Share Trip
              </button>
              <button className="option-btn" onClick={handleEditTrip}>
                Edit Trip
              </button>

              <button className="option-btn" onClick={() => navigate("/")}>
                New Trip
              </button>

              {/* <button className="option-btn">FAQ</button> */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
