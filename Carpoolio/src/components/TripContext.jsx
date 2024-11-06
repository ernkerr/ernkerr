import { createContext, useState } from "react";

// Create the TripContext
export const TripContext = createContext();

// Define the TripContext provider
export function TripContextProvider({ children }) {
  const [formData, setFormData] = useState({
    tripName: "", // str
    tripDate: "", //"Monday, November 4"
    tripBackground: {}, // {name: 'bluegoo', path: 'src/..'}
    departureTime: "", // str
    destination: "", // str
    tripDescription: "", //str
    glowColor: "#34bd34", //str
    lighterGlowColor: "", //str
    transparentGlowColor: "#4bfe4b52", //str
    cars: [], // carColor, carName
  });

  return (
    <TripContext.Provider value={{ formData, setFormData }}>
      {children}
    </TripContext.Provider>
  );
}
