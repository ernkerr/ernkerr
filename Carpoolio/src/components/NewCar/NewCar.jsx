import { useContext, useState, useEffect } from "react";
import { TripContext } from "@components/TripContext";
import CustomizeCar from "../CustomizeCar/CustomizeCar";
import RenderCar from "../RenderCar/RenderCar";
import NumSeats from "@components/NumSeats.jsx";
import "./NewCar.css";

export default function NewCar({ onNext }) {
  const { formData, setFormData } = useContext(TripContext);
  const [isAddingCar, setIsAddingCar] = useState("");
  const [driverName, setDriverName] = useState("");

  const [isNumSeatsSet, setIsNumSeatsSet] = useState("");
  const [isCustomizingCar, setIsCustomizingCar] = useState(false);
  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const [newCarCreated, setNewCarCreated] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // TODO: auto select add a new car after add a new ar btn is pressed on other pages (CustomizeTrip or TripPage)

  // progressive disclosure logic
  const handleYes = () => {
    if (isAddingCar) {
      // don't add another car if one is already being added
      console.log("A car is already being added. Please wait.");
      return; // exit
    }

    if (!newCarCreated) {
      // only proceed if no car has been created yet
      setIsAddingCar(true);
      handleAddNewCar(driverName); // pass driverName as argument
    }
  };

  // handle add new car
  useEffect(() => {
    if (newCarCreated) {
      setActiveCarIndex(formData.cars.length - 1);
      setNewCarCreated(false);
    }
  }, [newCarCreated]);

  const handleAddNewCar = async (driverName) => {
    const newCar = {
      carName: "",
      carColor: "#216191",
      numSeats: null,
      seatDistribution: { row1: 2, row2: 3, row3: 0, row4: 0 },
      seatNames: { row1: [driverName, ""], row2: [""], row3: [""], row4: [""] },
      departureDate: "",
      departureTime: "",
      departureLocation: "",
      tripId: formData.tripId, // include this Id to link to a trip
    };

    console.log("tripId: ", formData.tripId);
    console.log("Attempting to add new car with data:", newCar); // Log input data

    try {
      const response = await fetch(`${API_BASE_URL}/api/car`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });

      if (!response.ok) {
        throw new Error("Failed to save car");
      }

      const savedCar = await response.json();
      console.log("Car saved successfully:", savedCar);

      // add savedCar to formData
      setFormData((prevData) => ({
        ...prevData,
        cars: [...(prevData.cars || []), savedCar], // add savedCar to cars array using the spread operator
      }));
    } catch (error) {
      console.error("Error saving car:", error);
    }

    const newCarIndex = formData?.cars.length;
    setActiveCarIndex(newCarIndex);
    console.log(`new car index: ${newCarIndex}`);

    setNewCarCreated(true);
    setIsCustomizingCar(false);
  };

  // update driver name in the active car
  const changeDriverName = (event) => {
    const driverName = event.target.value;
    setDriverName(driverName);
    setFormData((prevData) => {
      const updatedCars = [...prevData.cars];
      if (activeCarIndex !== null && updatedCars[activeCarIndex]) {
        updatedCars[activeCarIndex].seatNames.row1[0] = driverName;
      }
      return { ...prevData, cars: updatedCars };
    });
  };

  const handleNumSeatsUpdate = (numSeats) => {
    setFormData((prevData) => {
      const updatedCars = [...(prevData.cars || [])];

      // check if activeCarIndex is valid and update car data
      if (activeCarIndex !== null && updatedCars[activeCarIndex]) {
        updatedCars[activeCarIndex].numSeats = numSeats;

        // handle Seat Distribution
        const seatDistribution = computeSeatDistribution(numSeats);
        updatedCars[activeCarIndex].seatDistribution = seatDistribution;
        // console.log("Updated seat distrubution:", seatDistribution);
      }
      return { ...prevData, cars: updatedCars, numSeats };
    });
    setIsNumSeatsSet(true);
  };

  const computeSeatDistribution = (numSeats) => {
    // logic to render seats based on numSeats
    const distribution = { row1: 0, row2: 0, row3: 0, row4: 0 }; // handle invalid inputs
    if (numSeats <= 0) return distribution;

    // min: driver + passenger
    distribution.row1 = Math.min(2, numSeats);

    // remaining seats
    let remainingSeats = numSeats - distribution.row1;

    // row 2: up to 3 seats
    distribution.row2 = Math.min(3, remainingSeats);
    remainingSeats -= distribution.row2;

    // row 3: up to 3 seats
    distribution.row3 = Math.min(3, remainingSeats);
    remainingSeats -= distribution.row3;

    // row 4: any remaining seats
    distribution.row4 = Math.min(3, remainingSeats);

    return distribution;
  };

  return (
    <>
      <>
        <button
          onClick={handleYes}
          className={`glass-btn ${isAddingCar === true ? "selected" : ""}`} // assign selected class based on isAddingCar state
          style={{
            background: formData?.tripBackground?.scrim || undefined,
          }}
        >
          + add a car
        </button>

        <button onClick={onNext} className="tertiary-btn">
          Skip
        </button>
      </>

      {isAddingCar && (
        <>
          {/* get driver's name  */}
          <input
            className="form-response"
            key="driverName"
            id="driverName"
            type="text"
            placeholder="who's drivin?"
            value={driverName}
            onChange={changeDriverName}
          />

          {/* if driver name is set, show num seats slider  */}
          {driverName && (
            <NumSeats
              activeCarIndex={activeCarIndex}
              onUpdate={handleNumSeatsUpdate}
            />
          )}

          {/* if num seats is set render car and customize car btn */}
          {driverName && (isNumSeatsSet || formData?.numSeats) && (
            <>
              {isCustomizingCar ? (
                <CustomizeCar
                  activeCarIndex={activeCarIndex}
                  setIsCustomizingCar={setIsCustomizingCar}
                  setIsAddingCar={setIsAddingCar}
                />
              ) : (
                <RenderCar
                  car={formData.cars[activeCarIndex]}
                  carIndex={activeCarIndex}
                  setIsCustomizingCar={setIsCustomizingCar}
                  setActiveCarIndex={setActiveCarIndex}
                />
              )}
            </>
          )}

          {/* if customize car btn is pressed show carName, color, etc. (modal?) */}
        </>
      )}
    </>
  );
}

{
  /* toggle  */
}
{
  /* <div className="checkbox">
          <input
            className="tgl"
            id="toggle"
            type="checkbox"
            checked={isAddingCar}
            onChange={handleToggle}
          />
          <label className="tgl-btn" htmlFor="toggle"></label>
        </div> */
}
