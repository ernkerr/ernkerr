/* From Uiverse.io by MuhammadHasann ( thanks I love it so much/appreciate your hard work ) */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "@components/TripContext";
import InviteModal from "../InviteModal/InviteModal";

export default function InviteBtn({ tripId }) {
  const navigate = useNavigate();
  const { formData } = useContext(TripContext);
  const [isShowingModal, setIsShowingModal] = useState(true);

  const handleInvite = () => {
    // navigate(`/trip/${tripId}`);
    setIsShowingModal(true);
  };

  return (
    <>
      {isShowingModal && (
        <div>
          <InviteModal onClose={() => setIsShowingModal(false)} />
        </div>
      )}

      <button
        className="star-button"
        onClick={handleInvite}
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
          border: ` 2px solid ${formData?.glowColor}`,
          boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
        }}
      >
        Invite
        <div className="star-1"></div>
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
        </div>
      </button>
    </>
  );
}
