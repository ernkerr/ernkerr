import messageIcon from "../../assets/img/message-icon.png";
import emailIcon from "../../assets/img/email-icon.png";
import copyLink from "../../assets/img/copy-link.png";
import bluegoo from "../../assets/gifs/bluegoo.gif";
import "./InviteModal.css";

export default function InviteModal({ onClose }) {
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
            <div className="share-icon-container">
              <a>
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
          </div>
        </div>
      </div>
    </>
  );
}
