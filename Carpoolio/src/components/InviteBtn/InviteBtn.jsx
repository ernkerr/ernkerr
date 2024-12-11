/* From Uiverse.io by MuhammadHasann ( thanks I love it so much/appreciate your hard work ) */
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TripContext } from "@components/TripContext";
import { glowBtn } from "@styles/styles";
// import Drawer from "react-bottom-drawer";

import inviteIcon from "../../assets/img/invite-icon.png";
import messageIcon from "../../assets/img/message-icon.png";
import emailIcon from "../../assets/img/email-icon.png";
import copyLink from "../../assets/img/copy-link.png";
import "./InviteBtn.css";

export default function InviteBtn({ isVisible, setIsVisible }) {
  const navigate = useNavigate();
  const { formData } = useContext(TripContext);
  const { tripId } = useParams();
  // const [isVisible, setIsVisible] = useState(false);

  const closeModal = () => setIsVisible(false);

  const shareURL = `${window.location.origin}/trip/${tripId}`;

  const handleShowModal = () => {
    setIsVisible(true);
  };

  return (
    <>
      <button
        className="invite-btn"
        // style={glowBtn(formData)}
        onClick={handleShowModal} // show modal when clicked
      >
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          className="invite-icon"
        >
          <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"></path>
        </svg>
        {/* Share */}
      </button>

      {isVisible && (
        <div className="modal">
          <div className="customize-trip-modal-content">
            <button onClick={closeModal} className="close-modal-btn">
              X
            </button>
            <p className="bottom-drawer-title">Share your trip!</p>
            <div className="share-icon-container-row">
              {/* share via SMS */}
              <div className="share-icon-container" id="share-sms">
                <a
                  // href={`sms:?body=${encodeURIComponent(shareText + shareURL)}`}
                  href={`sms:?body=${encodeURIComponent(shareURL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-text"
                >
                  <img
                    className="share-icon"
                    src={messageIcon}
                    alt="Message Bubble Icon"
                  />
                  <p className="share-text">Message</p>
                </a>
              </div>

              {/* share via email */}
              <div className="share-icon-container" id="share-email">
                <a
                  href={`mailto:?body=${encodeURIComponent(shareURL)}`}
                  className="share-text"
                >
                  <img
                    className="email-icon"
                    src={emailIcon}
                    alt="Email Message Bubble Icon"
                  />
                  <p className="share-text">Email</p>
                </a>
              </div>

              {/* copy link */}
              <div className="share-icon-container" id="copy-link">
                <a
                  onClick={() => {
                    // this won't work until carpoolio is running on https
                    navigator.clipboard
                      .writeText(shareURL)
                      .then(() => {
                        alert("Link copied to clipboard!");
                      })
                      .catch((err) => {
                        console.error("Failed to copy link: ", err);
                        alert("Failed to copy the link. Please try again.");
                      });
                  }}
                >
                  <img
                    className="copy-link-icon"
                    src={copyLink}
                    alt="Email Message Bubble Icon"
                  />
                  <p className="share-text">Copy Link</p>
                </a>
              </div>

              {/* share-icon-row */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

{
  /* <Helmet>
        <title>
          {tripDetails.tripName || "carpoolio - plan your next trip!"}
        </title>
        <meta
          name="description"
          content={tripDetails.description || "Join your next adventure!"}
        />
        <meta
          property="og:title"
          content={tripDetails.title || "Carpoolio - Plan Your Trip"}
        />
        <meta
          property="og:description"
          content={tripDetails.description || "Plan your carpool with ease."}
        />
        <meta
          property="og:image"
          content={tripDetails.image || "/default-preview.jpg"}
        />
        <meta
          property="og:url"
          content={`${window.location.origin}/trip/${tripDetails.id}`}
        />
      </Helmet> */
}
{
  /* these didn't go through */
}
