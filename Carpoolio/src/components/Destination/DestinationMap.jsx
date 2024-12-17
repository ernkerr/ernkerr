import { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import locationPin from "../../assets/img/location-pin.png";
import axios from "axios";

export default function DestinationMap({ destination }) {
  const [center, setCenter] = useState(null);
  const [isAddress, setIsAddress] = useState(false);
  const mapRef = useRef(null);

  // check if lat / lng exist in destination object
  const fetchLatLngFromLocation = (location) => {
    if (location && location.lat && location.lng) {
      return { lat: location.lat, lng: location.lng }; // Return coordinates if present
    } else {
      return null; // Return null if no valid location
    }
  };

  // function to retrieve lat/lng from address using Geocoding API
  const fetchLatLngFromAddress = async (address) => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address,
            key: import.meta.env.VITE_GMAPS_API_KEY, // import gmaps api key
          },
        }
      );

      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;
        return location; // { lat, lng }
      } else {
        console.error("Geocoding failed:", response.data.status);
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch latitude and longitude:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      let location = fetchLatLngFromLocation(destination?.location);

      if (!location && destination?.address) {
        location = await fetchLatLngFromAddress(destination?.address);
      }

      if (location) {
        setCenter(location); // set the center of the map
        setIsAddress(true); // valid address or location
      } else {
        setIsAddress(false); // no valid address or location
      }
    };

    if (destination) {
      fetchCoordinates();
    }
  }, [destination]);

  const customMapStyle = [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6195a0",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#e6f3d6",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#f4d2c5",
        },
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#f4f4f4",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#787878",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#eaf6f8",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#eaf6f8",
        },
      ],
    },
  ];

  return (
    <>
      {isAddress && (
        <GoogleMap
          mapContainerStyle={{
            width: "40%",
            height: "90px",
            margin: "10px",
            borderRadius: "10px",
          }}
          center={center}
          zoom={12}
          onLoad={(map) => (mapRef.current = map)} // save map instance when loaded
          options={{ styles: customMapStyle }}
          disableDefaultUI={true}
        >
          <Marker
            position={center}
            title="destination"
            icon={{
              url: locationPin, // custom location icon
              scaledSize: new google.maps.Size(40, 40), // make icon bigger
            }}
          />
        </GoogleMap>
      )}
    </>
  );
}
