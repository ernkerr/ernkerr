import { useState, useEffect, useRef, useContext, forwardRef } from "react";
import Autocomplete from "react-google-autocomplete";
import { TripContext } from "@components/TripContext";
import "./Destination.css";

const Destination = forwardRef(
  ({ isPreviewingTrip, onDestinationUpdate, onKeyDown }, ref) => {
    const { formData, setFormData } = useContext(TripContext);
    const [destination, setDestination] = useState(formData?.destination || "");
    const [location, setLocation] = useState(null);
    const autocompleteRef = useRef(null); // create an internal ref for the Autocomplete component

    // Combine internal ref (autocompleteRef) with forwarded ref
    // one ref needed for
    useEffect(() => {
      if (ref) {
        // if ref is a function, call it with the DOM node ?
        if (typeof ref === "function") {
          ref(autocompleteRef.current);
        } else {
          // Otherwise, assign the current element to ref
          ref.current = autocompleteRef.current;
        }
      }
    }, [ref]);

    // handle the location selection from the autocomplete
    const handleSelectedLocation = (place) => {
      if (!isPreviewingTrip) {
        const selectedPlaceName = place.name || ""; // check place name
        const selectedAddress = place.formatted_address || ""; // check if the place has a formatted address
        const selectedLocation = place.geometry?.location;

        const tripDestination =
          selectedAddress && selectedPlaceName
            ? selectedAddress.includes(selectedPlaceName)
              ? selectedAddress
              : `${selectedPlaceName}, ${selectedAddress}`
            : selectedPlaceName; // if no address, just use place name

        setDestination(tripDestination);
        updateFormData(tripDestination);

        // location data for map
        if (selectedLocation) {
          setLocation({
            lat: selectedLocation.lat(),
            lng: selectedLocation.lng(),
          });
        } else {
          setLocation(null); // Reset location if no geometry
          console.log("Location: ", location);
        }
      }
    };

    // handle manual input changes
    const handleInputChange = (event) => {
      if (!isPreviewingTrip) {
        const newDestination = event.target.value;

        setDestination(newDestination);
        updateFormData(newDestination);
      }
    };

    // update form data and send to parent
    const updateFormData = (value) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        destination: value,
      }));
    };

    // if onDestinationUpdate prop is defined, pass updated values as an object
    //   if (onDestinationUpdate) {
    //     onDestinationUpdate({ value, location: location || null });
    //   }

    // update the input field value based on state changes
    useEffect(() => {
      // If the autocompleteRef is available, manually set its value from state
      if (
        autocompleteRef.current &&
        autocompleteRef.current.value !== destination
      ) {
        autocompleteRef.current.value = destination;
      }
    }, [destination]); // Update the input value when the destination changes

    return (
      <>
        <Autocomplete
          apiKey={import.meta.env.VITE_GMAPS_API_KEY} //needs to be passed directly to the component as a prop
          onPlaceSelected={handleSelectedLocation}
          options={{
            types: ["geocode", "establishment"], // establishment to search for businesses, museums, etc.
            fields: ["name", "formatted_address", "geometry"],
          }}
          ref={autocompleteRef}
          value={destination}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          placeholder={destination ? destination : "Choose your destination"}
          className={`form-response ${isPreviewingTrip ? "disabled" : ""}`}
          style={{
            background: isPreviewingTrip
              ? formData?.tripBackground?.scrim || "transparent"
              : undefined, // default to the original background when not previewing
            pointerEvents: isPreviewingTrip ? "none" : "auto", // prevent interaction in preview mode
          }}
        />
      </>
    );
  }
);

export default Destination;

// on DestinationUpdate is a function that sends the destination and location data to the parent container
// the parent container (NewTripForm)

// useEffect(() => { ... }, [dependencies])
// this react hook (useEffect) runs whenever any of the variables in the dependency array change
