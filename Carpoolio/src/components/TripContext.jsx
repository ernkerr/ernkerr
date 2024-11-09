import { createContext, useState, useEffect } from "react";

// Create the TripContext
export const TripContext = createContext();

// Define the TripContext provider
export function TripContextProvider({ children }) {
  const [formData, setFormData] = useState({
    tripName: "", // str
    tripDate: "", //"Monday, November 4" str
    tripBackground: {}, // {name: 'bluegoo', path: 'src/..'} obj
    departureTime: "", // str
    destination: "", // str
    tripDescription: "", //str
    glowColor: "#34bd34", //str
    lighterGlowColor: "", //str
    transparentGlowColor: "#4bfe4b52", //str
    cars: [], // {carColor, carName} array of objects
  });

  // Function to save formData to the backend API
  const saveFormDataToBackend = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/saveFormData", {
        method: "POST", // use POST to send data
        headers: {
          "Content-Type": "application/json", // figure out what these are later
        },
        body: JSON.stringify(data), // send formData
      });

      if (!response.ok) {
        throw new Error("Network response error");
      }

      const responseData = await response.json();
      setFormData(data); // save fetched data to local state
      console.log("Data saved successfully:", responseData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // watch for changes in formData and save to backend API
  useEffect(() => {
    saveFormDataToBackend(formData); // pass formData to saveFormData whenever it changes
  }, [formData]);
  // may not be the most efficient, onBlur & saveData to backend for each component?

  return (
    <TripContext.Provider value={{ formData, setFormData }}>
      {children}
    </TripContext.Provider>
  );
}
