import { useContext } from "react";
import { TripContext } from "@components/TripContext"; // Adjust the import path as needed

export default function GetTripName() {
  const { formData, setFormData } = useContext(TripContext);
  return (
    <>
      {/* What would you like to call your trip? */}
      <h4 className="form-question">Name your trip </h4>
      <input
        className="text-input"
        type="text"
        required
        placeholder="Enter trip name here"
        onChange={(event) => {
          setFormData({
            ...formData,
            tripName: event.target.value,
          });
        }}
      />
    </>
  );
}

// flip trip every few seconds between trip, adventure, journey..
// "enter your name here"
// don't worry you can change it later"
