/* From Uiverse.io by MuhammadHasann ( thanks I love it so much/appreciate your hard work ) */
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TripContext } from "@components/TripContext";
import { glowBtn } from "@styles/styles";
import Drawer from "react-bottom-drawer";

import inviteIcon from "../../assets/img/invite-icon.png";
import messageIcon from "../../assets/img/message-icon.png";
import emailIcon from "../../assets/img/email-icon.png";
import copyLink from "../../assets/img/copy-link.png";
import "./BottomNav.css";

export default function InviteBtn() {
  const navigate = useNavigate();
  const { formData } = useContext(TripContext);
  const { tripId } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  const shareURL = `${window.location.origin}/trip/${tripId}`;

  return (
    <>
      <>
        <button className="invisible-btn" onClick={() => setIsVisible(true)}>
          btn
        </button>
        <button
          className="invite-btn"
          style={glowBtn(formData)}
          onClick={() => setIsVisible(true)} // show bottom drawer when clicked
        >
          <div className="invite-icon-container">
            <img
              className="invite-icon"
              src={inviteIcon}
              alt="Invite Person Icon"
            />
            Invite
          </div>
          {/* <div className="star-1"></div>
          <div className="star-2"></div>
          <div className="star-3"></div>
          <div className="star-4"></div>
          <div className="star-5"></div>
          <div className="star-6"></div>
          <div className="star-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                imageRendering: "optimizeQuality",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }}
              viewBox="0 0 784.11 815.53"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs />
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <path
                  className="fil0"
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                />
              </g>
            </svg>
          </div>
          <div className="star-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                imageRendering: "optimizeQuality",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }}
              viewBox="0 0 784.11 815.53"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs />
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <path
                  className="fil0"
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                />
              </g>
            </svg>
          </div>
          <div className="star-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                imageRendering: "optimizeQuality",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }}
              viewBox="0 0 784.11 815.53"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs />
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <path
                  className="fil0"
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                />
              </g>
            </svg>
          </div>
          <div className="star-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                imageRendering: "optimizeQuality",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }}
              viewBox="0 0 784.11 815.53"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs />
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <path
                  className="fil0"
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                />
              </g>
            </svg>
          </div>
          <div className="star-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                imageRendering: "optimizeQuality",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }}
              viewBox="0 0 784.11 815.53"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs />
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <path
                  className="fil0"
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                />
              </g>
            </svg>
          </div>
          <div className="star-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                imageRendering: "optimizeQuality",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }}
              viewBox="0 0 784.11 815.53"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs />
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <path
                  className="fil0"
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                />
              </g>
            </svg>
          </div> */}
        </button>
      </>

      {/* bottom drawer for sharing functionality */}
      <Drawer
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        duration={250}
        className="bottom-drawer"
      >
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
      </Drawer>
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
