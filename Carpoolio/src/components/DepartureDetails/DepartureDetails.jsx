import { useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import { TripContext } from "@components/TripContext";
import { TimeSelector } from "@components/TimeSelector/TimeSelector.jsx";
import CarNotes from "../CarNotes.jsx";
import clockIcon from "../../assets/img/Clock.png";
import calendarIcon from "../../assets/img/Calendar.png";
import "@components/DateSelector/DateSelector.css";
import "@components/DateSelector/Calendar.css";
import "./DepartureDetails.css";

export default function DepartureDetails({ isPreviewingTrip, activeCarIndex }) {
  const { formData, setFormData } = useContext(TripContext);

  // date of departure
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // time of departure
  const [isTimeSelectorVisible, setIsTimeSelectorVisible] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev); // toggle calendr visibility
  };

  const toggleTimeSelector = () => {
    setIsTimeSelectorVisible((prev) => !prev);
  };

  const handleDateChange = (date) => {
    const formattedDate = date
      ? date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      : null; // Set formattedDate to null if no date is selected

    setSelectedDate(formattedDate); // set date in local state
    setFormData((prevData) => {
      const updatedCars = [...prevData.cars];
      updatedCars[activeCarIndex] = {
        ...updatedCars[activeCarIndex],
        departureDate: formattedDate,
      };
      return { ...prevData, cars: updatedCars };
    });
    setIsCalendarVisible(false);
  };

  const handleTimeChange = (time) => {
    setFormData((prevData) => {
      const updatedCars = [...prevData.cars];
      updatedCars[activeCarIndex] = {
        ...updatedCars[activeCarIndex],
        departureTime: time,
      };
      return { ...prevData, cars: updatedCars };
    });
  };

  // departure date / time / location
  // car notes -> car chat?
  // spotify playlist

  const departureDateExists = !!formData?.cars?.[activeCarIndex]?.departureDate; // !! converts it to a bool
  const departureTimeExists = !!formData?.cars?.[activeCarIndex]?.departureTime; // if it exists: true, if it doesn't exist: false

  return (
    <>
      <div className="departure-details-container">
        {departureDateExists ? (
          <>
            <button
              className={`departure-details-btns ${
                isPreviewingTrip ? "disabled" : ""
              }`}
              onClick={toggleCalendar}
              disabled={isPreviewingTrip}
            >
              {/* <img className="icon" src={calendarIcon} alt="Calendar Time Icon" /> */}
              {formData?.cars?.[activeCarIndex]?.departureDate}
            </button>
          </>
        ) : (
          <button
            className={`departure-details-btns ${
              isPreviewingTrip ? "disabled" : ""
            }`}
            onClick={toggleCalendar}
            disabled={isPreviewingTrip}
          >
            <img className="icon" src={calendarIcon} alt="Calendar Time Icon" />
            Date of departure
          </button>
        )}

        {departureTimeExists ? (
          <button
            className={`departure-details-btns ${
              isPreviewingTrip ? "disabled" : ""
            }`}
            onClick={toggleTimeSelector}
            disabled={isPreviewingTrip}
          >
            <img className="icon" src={clockIcon} alt="Departure Time Icon" />
            {formData?.cars?.[activeCarIndex]?.departureTime}
          </button>
        ) : (
          <button
            className={`departure-details-btns ${
              isPreviewingTrip ? "disabled" : ""
            }`}
            onClick={toggleTimeSelector}
          >
            <img className="icon" src={clockIcon} alt="Departure Time Icon" />
            Time of departure
          </button>
        )}
      </div>

      {/* {!isPreviewingTrip && isCalendarVisible && ( */}
      {!isPreviewingTrip && isCalendarVisible && (
        <>
          <div className="modal-departure-details">
            <div className="modal-content-departure-details">
              <DayPicker
                mode="single"
                disabled={{ before: new Date() }}
                selected={selectedDate}
                onSelect={handleDateChange}
              />

              <button
                style={{
                  background: isPreviewingTrip
                    ? "transparent"
                    : formData?.tripBackground?.scrim || undefined,
                  pointerEvents: isPreviewingTrip ? "none" : "auto",
                }}
                className="calendar-button"
                onClick={() => {
                  toggleCalendar();
                  handleDateChange(null);
                }}
              >
                Not sure yet
              </button>
            </div>
          </div>
        </>
      )}

      {!isPreviewingTrip && isTimeSelectorVisible && (
        <>
          <div className="modal-departure-details">
            <div className="modal-content-departure-details">
              <TimeSelector
                toggleTimeSelector={toggleTimeSelector}
                onTimeChange={handleTimeChange}
              />
            </div>
          </div>
        </>
      )}

      <CarNotes activeCarIndex={activeCarIndex} />
      {/* {!isPreviewingTrip || carNotes
        ? formData?.cars?.[activeCarIndex]?.carNotes && (
            <textarea
              className="form-response"
              id="description-textarea"
              placeholder={carNotes || "Add notes about your car"}
              value={carNotes || ""}
              onChange={handleInput}
              disabled={isPreviewingTrip}
            ></textarea>
          )
        : null} */}
    </>
  );
}
