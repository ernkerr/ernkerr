import { useState } from "react";

import CustomizeTrip from "../components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../assets/bluegoo.gif";
import "../components/NewTripForm/NewTripForm.css";
import GetTripName from "../components/NewTripForm/GetTripName";
import GetTripDate from "../components/NewTripForm/GetTripDate";
import GetDestination from "../components/NewTripForm/GetDestination";

export default function NewTripForm() {
  const [page, setPage] = useState(0);
  const [isPreviewingTrip, setIsPreviewingTrip] = useState(false); // New state for CustomizeTrip

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tripName: "",
    tripDate: "",
    tripBackground: {},
    departureTime: "",
    destination: "",
    tripDescription: "",
    underglowColor: "",
    glowColor: "#34bd34",
    lighterGlowColor: "",
    transparentGlowColor: "#4bfe4b52",
    cars: [],
    carName: "",
    // newCarColorGradient: "",
    carColor: "",
    numSeats: 5,
    seatDistribution: { row1: 2, row2: 3, row3: 0, row4: 0 },
    seatNames: { row1: [""], row2: [""], row3: [""], row4: [""] },
  });

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <GetTripName formData={formData} setFormData={setFormData} />;
      case 1:
        return <GetDestination formData={formData} setFormData={setFormData} />;
      case 2:
        return <GetTripDate formData={formData} setFormData={setFormData} />;

      case 3:
        return (
          <CustomizeTrip
            formData={formData}
            setFormData={setFormData}
            isPreviewingTrip={isPreviewingTrip}
          />
        );

      // case 4:
      //   return <TripPage formData={formData} setFormData={setFormData} />;
    }
  };

  function handleContinue() {
    setPage(page + 1);
  }

  function handlePreview() {
    setIsPreviewingTrip(true);
  }

  function handleEdit() {
    setIsPreviewingTrip(false);
  }

  return (
    <div
      className="full-screen-wrapper"
      style={{
        backgroundImage: `url(${formData?.tripBackground?.path || bluegoo})`,

        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container-wrapper"
        style={{
          boxShadow: `0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.glowColor}, 0 0 20px ${formData?.lighterGlowColor}`,
          background: `${formData?.glowColor}`,
          height: page === 3 ? "85dvh" : "85dvh", // Increase height when on CustomizeTrip
          width: page === 3 ? "90dvw" : "80dvw", // Increase width when on CustomizeTrip
          // transition: "all 0.3s ease", // Smooth transition for resizing
        }}
      >
        <div
          className="container"
          style={{
            backgroundImage: `url(${
              formData?.tripBackground?.path || bluegoo
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {conditionalComponent()}
          <div className="button-group">
            {page !== 0 && page !== 3 && (
              <button
                style={{
                  background: formData?.tripBackground?.scrim || "transparent",
                  border: ` 2px solid ${formData?.glowColor}`,
                  boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                }}
                className="glow-button"
                onClick={() => setPage(page - 1)}
              >
                back
              </button>
            )}

            {/* Show the continue button on all pages except page 4 */}
            {page <= 2 && (
              <button
                style={{
                  background: formData?.tripBackground?.scrim || "transparent",
                  border: ` 2px solid ${formData?.glowColor}`,
                  boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                }}
                className="glow-button"
                onClick={handleContinue}
              >
                continue
              </button>
            )}

            {page > 2 &&
              (isPreviewingTrip ? (
                <button
                  style={{
                    background:
                      formData?.tripBackground?.scrim || "transparent",
                    border: ` 2px solid ${formData?.glowColor}`,
                    boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                  }}
                  className="glow-button"
                  onClick={handleEdit}
                >
                  edit
                </button>
              ) : (
                <button
                  style={{
                    background:
                      formData?.tripBackground?.scrim || "transparent",
                    border: ` 2px solid ${formData?.glowColor}`,
                    boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                  }}
                  className="customize-trip-glow-btns"
                  onClick={handlePreview}
                >
                  preview
                </button>
              ))}
            {/* save trip functionality  */}
          </div>
        </div>
      </div>
    </div>
  );
}

// add a skip btn
