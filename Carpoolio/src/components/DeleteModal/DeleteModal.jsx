import { useContext } from "react";
import { TripContext } from "@components/TripContext";

import "./DeleteModal.css";

export default function DeleteModal({ onCancel, onDelete }) {
  const { formData, setFormData } = useContext(TripContext);
  // TODO: lock scrolling when the modal is displayed

  return (
    <>
      <div className="confirm-delete-modal">
        <div className="modal-card-container">
          <div
            className="card"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <h3 className="warning-text">
              Are you sure you want <br /> to delete this car?
            </h3>
            <div className="modal-btn-container">
              <button className="modal-secondary-btn" onClick={onCancel}>
                Cancel
              </button>
              <button
                className="modal-primary-btn"
                style={{
                  background:
                    formData?.tripBackground?.scrim ||
                    formData?.transparentGlowColor,
                  border: ` 2px solid ${formData?.glowColor}`,
                  // boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                  boxShadow: `inset 0 0 5px ${formData?.glowColor}, 0 0 10px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                }}
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
