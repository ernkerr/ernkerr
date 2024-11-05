import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CustomizeTrip from "../components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../assets/bluegoo.gif";
import "../components/NewTripForm/NewTripForm.css";
import GetTripName from "../components/NewTripForm/GetTripName";
import GetTripDate from "../components/NewTripForm/GetTripDate";
import GetDestination from "../components/NewTripForm/GetDestination";
import axios from "axios";

export default function NewTripForm() {
  const [page, setPage] = useState(0);
  const [isPreviewingTrip, setIsPreviewingTrip] = useState(false); // New state for CustomizeTrip
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // name: "",
    // email: "",
    tripName: "", // str
    tripDate: "", //"Monday, November 4"
    tripBackground: {}, // {name: 'bluegoo', path: 'src/..'}
    departureTime: "", // str
    destination: "", // str
    tripDescription: "", //str
    // underglowColor: "",
    glowColor: "#34bd34", //str
    lighterGlowColor: "", //str
    transparentGlowColor: "#4bfe4b52", //str
    cars: [], // carColor, carName
    // carName: "",
    // carColor: "",
    // numSeats: 5,
    // seatDistribution: { row1: 2, row2: 3, row3: 0, row4: 0 },
    // seatNames: { row1: [""], row2: [""], row3: [""], row4: [""] },
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

  // function handleSubmit() {
  //   // save trip and load new page
  //   // TODO: send formData to database
  //   console.log("send data to database");
  //   console.log(formData);

  //   // TODO: create tripId and adminId to route to the trip page (custmoize trip, is previewing(true), add edit button, modal, and sharable link)
  //   <a href="/trip/:tripId/:adminId" className=""></a>; // how to navigate to trip page
  // }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/trips",
        formData
      ); // Send the entire formData object to the server

      if (response.status === 201) {
        const { tripId, adminId } = response.data; // create admin id
        console.log("Trip created:", response.data);
        navigate(`/trip/${tripId}/${adminId}`); // navigate to the trip page using tripId and adminId
      } else {
        console.log("Failed to create trip");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

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
            {page > 2 && (
              <button
                style={{
                  background: formData?.tripBackground?.scrim || "transparent",
                  border: ` 2px solid ${formData?.glowColor}`,
                  boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                }}
                className="customize-trip-glow-btns"
                onClick={handleSave}
              >
                save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
