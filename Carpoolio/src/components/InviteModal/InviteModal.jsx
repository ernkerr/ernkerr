import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toPng } from "html-to-image";
import { TripContext } from "@components/TripContext";
import axios from "axios";

import messageIcon from "../../assets/img/message-icon.png";
import emailIcon from "../../assets/img/email-icon.png";
import copyLink from "../../assets/img/copy-link.png";
import bluegoo from "../../assets/gifs/bluegoo.gif";
import "./InviteModal.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function InviteModal({ onClose }) {
  const { formData, setFormData } = useContext(TripContext);
  //   const [tripBackground, setTripBackground] = useState("");
  //   const [imageURL, setImageURL] = useState(null);
  const { tripId } = useParams();

  const shareURL = `${window.location.origin}/trip/${tripId}`;
  //   const shareText = `you've been invited to a trip`;

  //   useEffect(() => {
  //     // fetch trip details
  //     const fetchTripDetails = async () => {
  //       try {
  //         const response = await axios.get(`${API_BASE_URL}/api/trip/${tripId}`);
  //         if (response.data) {
  //           setTripBackground(response.data.tripBackground.path || "default");
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch trip details:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchTripDetails();
  //   }, [tripId]);

  //   // create an image for text messages
  //   handleGenerateImage = () => {
  //     const node = document.getElementById("trip-preview");

  //     toPng(node)
  //       .then((dataURL) => {
  //         setImageURL(dataURL); // save the image url to state
  //         console.log("Generated image URL: ", dataURL);
  //       })
  //       .catch((error) => console.error("Error generating image:", error));
  //   };

  return (
    <>
      <div className="invite-modal">
        <div className="modal-card-container">
          <div
            className="card"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <button onClick={onClose}>X</button>

            <h3>share your trip</h3>

            {/* Share via SMS */}
            <div className="share-icon-container">
              <a
                // href={`sms:?body=${encodeURIComponent(shareText + shareURL)}`}
                href={`sms:?body=${encodeURIComponent(shareURL)}`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <img
                  className="share-icon"
                  src={messageIcon}
                  alt="Message Bubble Icon"
                />
                <span>message</span>
              </a>
            </div>
            {/* <div className="modal-btn-container">
              <button className="modal-secondary-btn" onClick={onCancel}>
                Cancel
              </button>
            </div> */}
            {/* Share via Email */}
            {/* <a
              href={`mailto:?subject=Check this out!&body=${encodeURIComponent(
                shareText + shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button email-button"
            >
              Share via Email
            </a> */}
            {/* Copy to Clipboard */}
            {/* <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                alert("Link copied to clipboard!");
              }}
              className="button copy-button"
            >
              Copy Link
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
