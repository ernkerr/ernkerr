import { useEffect, useState, useContext, useRef } from "react";
import { TripContext } from "@components/TripContext";
import { formResponseStyle, glowBtn } from "@styles/styles";

import "./MoreBtn.css";
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

  const handleMore = () => {
    setIsShowingMore(true);
  };

  const handleClose = () => {
    setIsShowingMore(false);
  };

  return (
    <>
      <button onClick={handleMore} className="more-btn">
        ...
      </button>

      {isShowingMore && (
        <>
          <div className="more-options">
            <div className="option-container">
              <button>Login</button>
              <button>Edit Trip</button>
              <EditBtn
                isAdmin={isAdmin}
                isPreviewingTrip={isPreviewingTrip}
                togglePreview={togglePreview}
              />

              <button onClick={() => setIsInviteModalVisible(true)}>
                Share Trip
              </button>
              {/* <InviteBtn
                isVisible={isInviteModalVisible}
                setIsVisible={setIsInviteModalVisible}
              /> */}

              <button>New Trip</button>
              <button>FAQ</button>
            </div>
          </div>
          <button onClick={handleClose}>Close</button>
        </>
      )}
    </>
  );
}
