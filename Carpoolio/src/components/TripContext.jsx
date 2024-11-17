import { createContext, useState, useEffect } from "react";

// Create the TripContext
export const TripContext = createContext();

// Define the TripContext provider
export function TripContextProvider({ children }) {
  const [formData, setFormData] = useState({
    tripName: "", // str
    destination: "", // str
    tripDate: "", //"Monday, November 4" str
    tripTime: "", // TODO: add to schema
    tripDescription: "", //str

    tripBackground: {}, // {name: 'bluegoo', path: 'src/..'} obj
    glowColor: "#34bd34", //str
    lighterGlowColor: "", //str
    transparentGlowColor: "#4bfe4b52", //str
    cars: [], // {carColor, carName} array of objects
    departureTime: "", // TODO: add to individual car schema
  });

  // Function to save formData to the backend API
  const saveFormDataToBackend = async (data) => {
    try {
      const response = await fetch(
        "http://192.168.0.28:8080/api/saveFormData",
        {
          method: "POST", // use POST to send data
          headers: {
            "Content-Type": "application/json", // figure out what these are later
          },
          body: JSON.stringify(data), // send formData
        }
      );

      if (!response.ok) {
        throw new Error("Network response error");
      }

      // Check if the response has a body
      const text = await response.text();
      if (text) {
        const responseData = JSON.parse(text); // Parse if there's content
        setFormData(data); // Save formData to local state
        console.log("Data saved successfully:", responseData);
      } else {
        console.warn("No content in response.");
        setFormData(data); // Still set local state even if there's no response data
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // watch for changes in formData and save to backend API

  useEffect(() => {
    saveFormDataToBackend(formData); // pass formData to saveFormData whenever it changes
  }, [formData]);

  // may not be the most efficient, onBlur & saveData to backend for each component?
  // at next?

  return (
    <TripContext.Provider value={{ formData, setFormData }}>
      {children}
    </TripContext.Provider>
  );
}
