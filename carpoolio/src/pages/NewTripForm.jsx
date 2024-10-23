import { useState } from "react";

import CustomizeTrip from "../components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../assets/bluegoo.gif";
import "../components/NewTripForm/NewTripForm.css";
import TripPage from "./TripPage";
import GetTripName from "../components/NewTripForm/GetTripName";
import GetTripDate from "../components/NewTripForm/GetTripDate";
import GetDestination from "../components/NewTripForm/GetDestination";

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
    underglowColor: "",
    glowColor: "rgb(52, 189, 52)",
    lighterGlowColor: "",
    cars: [],
    // carName: "",
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
      // trip name
      case 0:
        return <GetTripName formData={formData} setFormData={setFormData} />;
      case 1:
        return <GetDestination formData={formData} setFormData={setFormData} />;
      case 2:
        return <GetTripDate formData={formData} setFormData={setFormData} />;

      // case 2:
      //   if (formData.tripDate && formData.tripDate !== "TBD") {
      //     return (
      //       <DepartureTime formData={formData} setFormData={setFormData} />
      //     );
      //   }

      case 2:
        return <CustomizeTrip formData={formData} setFormData={setFormData} />;
      // case 1:
      //   return <GetUserName formData={formData} setFormData={setFormData} />;

      // case 1:
      //   return <GetUserContact formData={formData} setFormData={setFormData} />;

      case 5:
        return <TripPage formData={formData} setFormData={setFormData} />;
    }
  };

  function handleContinue() {
    setPage(page + 1);
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
            {page !== 0 && (
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
            {page !== 4 && (
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

            {/* add a car functionality */}
            {/* {page == 1 && (
              <>
                <NewCar formData={formData} setFormData={setFormData} />
              </>
              // style it like a plus in the bottom corner  + add a car : brings up a modal not a new page!
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

// add a skip btn
