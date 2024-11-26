import { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import locationPin from "../../assets/img/location-pin.png";
import axios from "axios";

export default function DestinationMap({ address }) {
  const [center, setCenter] = useState(null);
  const [isAddress, setIsAddress] = useState(false);
  const mapRef = useRef(null);

  // geocode function to fetch coordinates for the address
  const fetchLatLngFromAddress = async (address) => {
    try {
      //   const API_KEY = import.meta.env.VITE_GMAPS_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address,
            key: import.meta.env.VITE_GMAPS_API_KEY,
          },
        }
      );
      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;
        setIsAddress(true);
        console.log("location set: ", location);
        return location; // { lat: <latitude>, lng: <longitude> }
      } else {
        setIsAddress(false); // Invalid address
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch latitude and longitude:", error);
      console.error("Error with Geocoding API:", response.data.status);
      setIsAddress(false);
      return null;
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      const location = await fetchLatLngFromAddress(address);
      if (location) {
        setCenter(location); // set the center of the map
      }
    };
    if (address) {
      fetchCoordinates();
    }
  }, [address]);

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
            width: "45%",
            height: "100px",
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
