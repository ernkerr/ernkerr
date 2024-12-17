import { useState, useEffect, useContext, act } from "react";
import axios from "axios";
import { TripContext } from "@components/TripContext";
import { secondaryBtn } from "@styles/styles.js";
import DeleteModal from "../DeleteModal/DeleteModal";

export default function DeleteCarBtn({
  carId,
  onDelete,
  children,
  className,
  id,
}) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { formData, setFormData } = useContext(TripContext);
  const [isDeletingCar, setIsDeletingCar] = useState(false);

  const handleDeleteCarModal = () => setIsDeletingCar(true);

  const handleDeleteCar = async () => {
    console.log("attempting to delete carId: ", carId);
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/car/${carId}`);
      // if car deletion is a sucess
      if (response.status === 200) {
        console.log(`carId: ${carId} deleted successfully`);
        // update frontend state by filtering out the deleted car
        setFormData((prevData) => {
          const updatedCars = prevData.cars.filter(
            (car) => car.carId !== carId
          );
          return { ...prevData, cars: updatedCars };
        });

        // trigger callback if provided
        if (onDelete) onDelete(carId);
        // in parent component:   // setIsCustomizingCar(false);
      }
    } catch (error) {
      console.error("Error deleting car:", error.message);
      console.error("Full error:", error);
    } finally {
      setIsDeletingCar(false);
    }
  };

  return (
    <>
      {isDeletingCar && (
        <div className="confirmation-modal">
          <DeleteModal
            onCancel={() => setIsDeletingCar(false)}
            onDelete={handleDeleteCar}
          />
        </div>
      )}
      <button
        className={className}
        id={id}
        style={secondaryBtn(formData)}
        onClick={handleDeleteCarModal}
      >
        {children || "Delete car"}
      </button>
    </>
  );
}
