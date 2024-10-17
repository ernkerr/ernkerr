import { useState } from "react";
import "../CustomizeCar/CustomizeCar.css";
import CustomizeCar from "../CustomizeCar/CustomizeCar.jsx";

const NewCarModal = ({ formData, setFormData }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="glow-button"
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
          border: ` 2px solid ${formData.glowColor}`,
          boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
        }}
      >
        add a car
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <CustomizeCar
                formData={formData}
                setFormData={setFormData}
                toggleModal={toggleModal}
              />

              <button className="close-modal-btn" onClick={toggleModal}>
                x
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewCarModal;
