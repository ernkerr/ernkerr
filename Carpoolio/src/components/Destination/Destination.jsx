import { useState, useEffect, useRef, useContext, forwardRef } from "react";
import Autocomplete from "react-google-autocomplete";
import { TripContext } from "@components/TripContext";
import "./Destination.css";

const Destination = forwardRef(
  ({ isPreviewingTrip, onDestinationUpdate, onKeyDown }, ref) => {
    const { formData, setFormData } = useContext(TripContext);
    const [placeSelected, setPlaceSelected] = useState(false);
    const [destination, setDestination] = useState(
      formData?.destination || { name: "", address: "", location: null }
    );

    // combine internal ref (autocompleteRef) with forwarded ref
    // one ref needed for ? understand this better
    // useEffect(() => {
    //   if (ref) {
    //     // if ref is a function, call it with the DOM node ?
    //     if (typeof ref === "function") {
    //       ref(autocompleteRef.current);
    //     } else {
    //       // Otherwise, assign the current element to ref
    //       ref.current = autocompleteRef.current;
    //     }
    //   }
    // }, [ref]);

    // handle the location selection from the autocomplete
    const handleSelectedLocation = (place) => {
      console.log("Place selected:", place);
      setPlaceSelected(true); // mark that a place has been selected

      if (!isPreviewingTrip) {
        // if in editing mode
        const tripDestination = {
          name: place?.name || "", // place name
          address: place?.formatted_address || "", // formatted address
          location: place?.geometry?.location
            ? {
                lat: place?.geometry?.location.lat(),
                lng: place?.geometry?.location.lng(),
              }
            : null, // latitude and longitude
        };

        console.log("Formatted destination object:", tripDestination);

        console.log("Selected Place Name:", tripDestination.name);
        console.log("Selected Address:", tripDestination.address);
        console.log("Selected Location:", tripDestination.location);

        setDestination(tripDestination); // update UI input field
        updateFormData(tripDestination); // update backend with object
      }
    };

    // handle manual input changes
    const handleInputChange = (event) => {
      if (!isPreviewingTrip) {
        const newInput = event.target.value;
        setPlaceSelected(false); // if typing is detected, set placeSelected to false

        if (!placeSelected) {
          const manualDestination = {
            name: newInput,
            address: "",
            location: null, // if manually typed, reset location lat/lng to null
          };

          console.log("Manual input:", manualDestination);

          setDestination(manualDestination);
          // updateFormData(manualDestination);
        }
      }
    };

    // update form data and send to parent
    const updateFormData = (value) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        destination: value,
      }));

      if (onDestinationUpdate) {
        onDestinationUpdate(value);
      }
    };

    // update the input field value based on state changes
    // useEffect(() => {
    //   // If the autocompleteRef is available, manually set its value from state
    //   if (
    //     autocompleteRef.current &&
    //     autocompleteRef.current.value !== destination.name
    //   ) {
    //     autocompleteRef.current.value = destination.name;
    //   }
    // }, [destination]); // Update the input value when the destination changes

    return (
      <Autocomplete
        apiKey={import.meta.env.VITE_GMAPS_API_KEY} //needs to be passed directly to the component as a prop
        onPlaceSelected={handleSelectedLocation}
        options={{
          types: ["geocode", "establishment"], // establishment to search for businesses, museums, etc.
          fields: ["name", "formatted_address", "geometry"],
        }}
        // ref={autocompleteRef}
        value={destination.name}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        placeholder={
          destination.name ? destination.name : "Choose your destination"
        }
        className={`form-response ${isPreviewingTrip ? "disabled" : ""}`}
        style={{
          background: isPreviewingTrip
            ? "transparent"
            : formData?.tripBackground?.scrim || undefined,
          pointerEvents: isPreviewingTrip ? "none" : "auto",
        }}
      />
    );
  }
);

export default Destination;

// on DestinationUpdate is a function that sends the destination and location data to the parent container
// the parent container (NewTripForm)

// useEffect(() => { ... }, [dependencies])
// this react hook (useEffect) runs whenever any of the variables in the dependency array change
