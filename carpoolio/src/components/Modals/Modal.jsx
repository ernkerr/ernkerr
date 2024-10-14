import { useState } from "react";
import "./Modal.css";

const Modal = ({ children }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        {children}
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <h2>Hello Modal</h2>
              <button className="close-modal-btn" onClick={toggleModal}>
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
