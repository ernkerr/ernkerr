import { useContext } from "react";
import { TripContext } from "@components/TripContext";
import CarNotes from "./CarNotes";

export default function CarDetails({ isPreviewingTrip, activeCarIndex }) {
  const { formData, setFormData } = useContext(TripContext);

  // departure date / time / location
  // car notes -> car chat?
  // spotify playlist

  //   const handleInput = (event) => {
  //     const newCarNotes = event.target.value;
  //     event.target.style.height = "17.5px";
  //     event.target.style.height = `${event.target.scrollHeight}px`;

  //     setFormData((prevData) => {
  //       const updatedCars = [...prevData.cars]; // copy cars array
  //       updatedCars[activeCarIndex] = {
  //         ...updatedCars[activeCarIndex],
  //         carNotes: newCarNotes,
  //       };
  //       return { ...prevData, cars: updatedCars };
  //     });
  //   };

  //   const carNotes = formData?.cars?.[activeCarIndex]?.carNotes;

  return (
    <>
      <CarNotes activeCarIndex={activeCarIndex} />
      {/* {!isPreviewingTrip || carNotes
        ? formData?.cars?.[activeCarIndex]?.carNotes && (
            <textarea
              className="form-response"
              id="description-textarea"
              placeholder={carNotes || "Add notes about your car"}
              value={carNotes || ""}
              onChange={handleInput}
              disabled={isPreviewingTrip}
            ></textarea>
          )
        : null} */}
    </>
  );
}
