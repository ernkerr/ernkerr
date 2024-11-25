import { useEffect, useState, useContext, useRef } from "react";
import hexRgb from "hex-rgb";
import { GoogleMap, Marker } from "@react-google-maps/api"; // Assuming you use this package
import DateSelector from "@components/DateSelector/DateSelector.jsx";
import TripBackground from "@components/TripBackground.jsx";
import RenderCar from "../RenderCar/RenderCar.jsx";
import CustomizeCar from "../CustomizeCar/CustomizeCar.jsx";
import Description from "@components/Description/Description.jsx";
import "./CustomizeTrip.css";
import { TripContext } from "@components/TripContext";
import navArrow from "../../assets/img/navarrow.png";
import locationIcon from "../../assets/img/location-icon.png";
import locationPin from "../../assets/img/location-pin.png";
import Destination from "../Destination/Destination.jsx";
import TripName from "../TripName.jsx";

export default function CustomizeTrip({
  isPreviewingTrip,
  setIsPreviewingTrip,
  destinationInfo,
  isAdmin,
}) {
  const { formData, setFormData } = useContext(TripContext); // Access TripContext here
  const [isCustomizingCar, setIsCustomizingCar] = useState(false);
  const [activeCarIndex, setActiveCarIndex] = useState(null);
  const [isShowingStyleOptions, setIsShowingStyleOptions] = useState(false);

  const center = destinationInfo?.destination || {
    lat: 37.7749,
    lng: -122.4194,
  }; // use provided location, fallback to San Francisco
  const mapRef = useRef(null); // Reference to the map instance

  const handlePreviewToggle = () => {
    setIsPreviewingTrip((prev) => !prev);
    console.log("center: ", center);
    console.log("locationInfo: ", destinationInfo);
    console.log("location", location);
  };

  // handle get directions
  const isAddress = formData?.destination && formData.destination.includes(","); // Check if destination has a comma
  // check if the destination resembles an address by looking for a comma

  const handleGetDirections = () => {
    const destination = encodeURIComponent(formData?.destination || "");
    const url = `http://maps.apple.com/?q=${destination}`;
    window.open(url, "_blank");
  };

  const handleShowStyleOptions = () => {
    setIsShowingStyleOptions((prevState) => !prevState);
  };

  // styling
  const handleGlowColorChange = (event) => {
    const newGlowColor = event.target.value;
    const { red: r, green: g, blue: b } = hexRgb(newGlowColor);
    const lighterGlowColor = `rgb(${Math.min(r + 10, 255)}, ${Math.min(
      g + 10,
      255
    )}, ${Math.min(b + 10, 255)})`;
    const transparentGlowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;

    setFormData((prevData) => ({
      ...prevData,
      glowColor: newGlowColor,
      lighterGlowColor: lighterGlowColor,
      transparentGlowColor: transparentGlowColor,
    }));
  };

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
    <div className="customize-trip-container">
      <div className="details-container">
        <TripName isPreviewingTrip={isPreviewingTrip} />
        {/* make a map */}

        <div className={isAddress ? "destination-container" : ""}>
          {isAddress && (
            <GoogleMap
              mapContainerStyle={{
                width: "45%",
                height: "100px",
                margin: "15px",
                borderRadius: "10px",
              }}
              center={center}
              zoom={12}
              onLoad={(map) => (mapRef.current = map)} // save map instance when loaded
              options={{ styles: customMapStyle }}
            >
              <Marker
                position={center}
                title="destination"
                icon={{
                  url: locationPin, // Use your custom location icon
                  scaledSize: new google.maps.Size(40, 40), // Adjust the size while maintaining the aspect ratio
                }}
              />
            </GoogleMap>
          )}

          <div className="address-directions-container">
            <div className={isAddress ? "address-container" : ""}>
              {isAddress ? (
                <>
                  <img
                    className="location-icon"
                    src={locationIcon}
                    alt="Location Icon"
                  />
                  <p className="destination-customize-trip">
                    {formData?.destination}
                  </p>
                </>
              ) : (
                <Destination
                  isPreviewingTrip={isPreviewingTrip}
                  // isCustomizeTripPage={true}
                />
              )}
            </div>
            {isAddress && (
              <>
                <button
                  className="get-directions"
                  onClick={handleGetDirections}
                >
                  <img
                    className="nav-arrow"
                    src={navArrow}
                    alt="Navigational Arrow"
                  />
                  Get Directions
                </button>
                <button
                  className="get-directions"
                  onClick={handleGetDirections}
                >
                  Edit destination
                </button>
              </>
            )}
          </div>
        </div>

        <div className="date-selector">
          <DateSelector isPreviewingTrip={isPreviewingTrip} />
        </div>

        <Description isPreviewingTrip={isPreviewingTrip} />

        <>
          {!isPreviewingTrip && (
            <>
              <button
                className="preview-btn"
                style={{
                  background:
                    formData?.tripBackground?.scrim ||
                    formData?.transparentGlowColor,
                  border: ` 1px solid ${formData?.glowColor}`,
                  boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                }}
                onClick={handleShowStyleOptions}
              >
                {isShowingStyleOptions ? "Close" : "Style Options"}
              </button>
              {isShowingStyleOptions && (
                <>
                  <TripBackground />
                  <button
                    className="customize-trip-btns"
                    style={{
                      background:
                        formData?.tripBackground?.scrim || "transparent",
                    }}
                  >
                    <label htmlFor="glowColor">Change Glow Color </label>
                    <input
                      className="glowColor"
                      type="color"
                      id="glowColor"
                      name="glowColor"
                      value={formData?.glowColor || " #34bd34"}
                      onChange={handleGlowColorChange} // update the glow color on change
                    />
                  </button>
                </>
              )}
            </>
          )}
        </>
      </div>
      <div className="car-container">
        {formData?.cars?.map((car, index) => {
          if (index === activeCarIndex && isCustomizingCar) {
            return (
              <CustomizeCar
                key={index}
                activeCarIndex={activeCarIndex}
                setActiveCarIndex={setActiveCarIndex}
                setIsCustomizingCar={setIsCustomizingCar}
              />
            );
          } else {
            return (
              <RenderCar
                key={index}
                car={car}
                carIndex={index}
                setIsCustomizingCar={setIsCustomizingCar}
                setActiveCarIndex={setActiveCarIndex}
              />
            );
          }
        })}
      </div>
      <button
        className="preview-btn"
        style={{
          background:
            formData?.tripBackground?.scrim || formData?.transparentGlowColor,
          border: ` 1px solid ${formData?.glowColor}`,
          boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
        }}
        onClick={handlePreviewToggle}
      >
        {isPreviewingTrip ? "Edit Trip" : "Preview Trip"}
      </button>

      {/* <button
        onClick={handleAddNewCar}
        className="new-car-btn"
        style={{
          background:
            formData?.tripBackground?.scrim || formData.transparentGlowColor,
          border: ` 2px solid ${formData.glowColor}`,
          boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
        }}
      >
        + Add Car
      </button> */}
    </div>
  );
}

// else if no coordinates
//  const center = { lat: 37.7749, lng: -122.4194 }; // Example coordinates (San Francisco)
