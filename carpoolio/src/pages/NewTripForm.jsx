import { useState } from "react";

import GetUserName from "../components/GetUserName";
import CustomizeTrip from "../components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../assets/bluegoo.gif";
import "./NewTripForm.css";
import TripPage from "./TripPage";

export default function NewTripForm() {
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tripName: "",
    tripDate: "",
    tripBackground: {},
    departureTime: "",
    destination: "",
    carColor: "",
    underglowColor: "",
    glowColor: "rgb(52, 189, 52)",
    lighterGlowColor: "",
    numSeats: 5,
    cars: [],
    seatDistribution: {},
    seatNames: {},
  });

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <GetUserName formData={formData} setFormData={setFormData} />;
      // case 1:
      //   return <GetUserContact formData={formData} setFormData={setFormData} />;
      case 1:
        return <CustomizeTrip formData={formData} setFormData={setFormData} />;
      // case 3:
      //   return <NumSeats formData={formData} setFormData={setFormData} />;
      // case 4:
      //   return <CustomizeCar formData={formData} setFormData={setFormData} />;
      case 5:
        return <TripPage formData={formData} setFormData={setFormData} />;
      // default:
      //   return <GetUserName formData={formData} setFormData={setFormData} />;
    }
  };

  function handleContinue() {
    setPage(page + 1);
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="full-screen-wrapper"
      style={{
        backgroundImage: `url(${formData.tripBackground.path || bluegoo})`,

        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container-wrapper"
        style={{
          boxShadow: `0 0 5px ${formData.glowColor}, 0 0 15px ${formData.glowColor}, 0 0 20px ${formData.lighterGlowColor}`,
          background: `${formData.glowColor}`,
        }}
      >
        <div
          className="container"
          style={{
            backgroundImage: `url(${formData.tripBackground.path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {conditionalComponent()}
          <div className="button-group">
            {page !== 0 && (
              <button
                style={{
                  background: formData?.tripBackground?.scrim || "transparent",
                  border: ` 2px solid ${formData.glowColor}`,
                  boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
                }}
                className="glow-button"
                onClick={() => setPage(page - 1)}
              >
                back
              </button>
            )}
            {/* Show the continue button on all pages except page 4 */}
            {page !== 4 && (
              <button
                style={{
                  background: formData?.tripBackground?.scrim || "transparent",
                  border: ` 2px solid ${formData.glowColor}`,
                  boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
                }}
                className="glow-button"
                onClick={handleContinue}
              >
                continue
              </button>
            )}

            {/* add a car functionality
            {page == 1 && (
              <>
                <CustomizeCarModal
                  formData={formData}
                  setFormData={setFormData}
                />
              </>
              // style it like a plus in the bottom corner  + add a car : brings up a modal not a new page!
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
