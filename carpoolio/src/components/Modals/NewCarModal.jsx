import { useState } from "react";
import "./NewCarModal.css";
import CustomizeCar from "../CustomizeCar/CustomizeCar.jsx";

const Modal = ({ formData, setFormData }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSaveCar = () => {
    // add car to formData
    const newCar = {
      carColor: formData.carColor,
      seatNames: formData.seatNames,
      // TODO : add row information after refactor
    };

    setFormData((formData) => ({
      ...formData,
      cars: [
        ...(formData.cars || []), // spread the existing cars array or use an empty array if there are no cars yet
        newCar, // add the new car object to the array of saved cars
      ],
    }));

    toggleModal();

    //functionality to send car to database with formData
    console.log("Send car to database");
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
              <CustomizeCar formData={formData} setFormData={setFormData} />
              <button className="close-modal-btn" onClick={toggleModal}>
                x
              </button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <CustomizeCar formData={formData} setFormData={setFormData} />
              <button
                className="glow-button"
                style={{
                  background: formData?.tripBackground?.scrim || "transparent",
                  border: ` 2px solid ${formData.glowColor}`,
                  boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
                }}
                onClick={handleSaveCar}
              >
                save car
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
