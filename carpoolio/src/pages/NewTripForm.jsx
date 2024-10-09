import { useState } from "react";

import GetUserName from "../components/GetUserName";
import IsUserDriving from "../components/IsUserDriving";
import GetUserContact from "../components/GetUserContact";
import CustomizeCar from "../components/CustomizeCar/CustomizeCar";
import CustomizeTrip from "../components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../assets/bluegoo.gif";
import "./NewTripForm.css";

export default function NewTripForm() {
  const [page, setPage] = useState(0);
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
    glowColor: "",
    lighterGlowColor: "",
  });

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const [isDriving, setIsDriving] = useState(null);

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <GetUserName formData={formData} setFormData={setFormData} />;
      case 1:
        return <GetUserContact formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <IsUserDriving
            setDrivingStatus={setIsDriving}
            onDrivingStatusChange={() => setPage(3)}
          />
        );
      case 3:
        return isDriving ? (
          <CustomizeCar formData={formData} setFormData={setFormData} />
        ) : (
          <CustomizeTrip formData={formData} setFormData={setFormData} />
        );
      default:
        return <GetUserName formData={formData} setFormData={setFormData} />;
    }
  };

  function handleContinue() {
    setPage(page + 1);
  }

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
          boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 30px ${formData.lighterGlowColor}`,
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
            {page > 0 && page < 2 && (
              <button
                id="left-button"
                className="glow-button"
                onClick={() => setPage(page - 1)}
              >
                back
              </button>
            )}
            {page < 2 && (
              <button
                id="right-button"
                className="glow-button"
                onClick={handleContinue}
              >
                continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
