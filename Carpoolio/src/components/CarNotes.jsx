import { useContext } from "react";
import { TripContext } from "@components/TripContext";

export default function CarNotes({ isPreviewingTrip, activeCarIndex }) {
  const { formData, setFormData } = useContext(TripContext);

  const handleInput = (event) => {
    const newCarNotes = event.target.value;
    event.target.style.height = "17.5px";
    event.target.style.height = `${event.target.scrollHeight}px`;

    setFormData((prevData) => {
      const updatedCars = [...prevData.cars]; // copy cars array
      updatedCars[activeCarIndex] = {
        ...updatedCars[activeCarIndex],
        carNotes: newCarNotes,
      };
      return { ...prevData, cars: updatedCars };
    });
  };

  const carNotes = formData?.cars?.[activeCarIndex]?.carNotes;

  return (
    <>
      {!isPreviewingTrip || carNotes !== undefined
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
        : null}
      {/* if carNotes is empty and you are previewing the trip it should not render - null */}
    </>
  );
}
