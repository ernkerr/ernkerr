import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { TimeSelector } from "../TimeSelector/TimeSelector";
import clockIcon from "../../../assets/img/Clock.png";
import "../../NewTripForm/Calendar.css";
import "./DateSelector.css";

// go back to opening in a modal?

export default function DateSelector({ formData, setFormData }) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isTimeSelectorVisible, setIsTimeSelectorVisible] = useState(false); // Time selector state
  const [selectedDate, setSelectedDate] = useState(null);

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const toggleTimeSelector = () => {
    setIsTimeSelectorVisible((prev) => !prev);
  };

  // Handle date change
  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date); // Set selected date

      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      setFormData({ ...formData, tripDate: formattedDate });
      setIsCalendarVisible(false);
    }
  };

  // extract month and day for calendar icon
  const tripDateObj =
    formData.tripDate && formData.tripDate !== "TBD"
      ? new Date(formData.tripDate)
      : null;
  const tripMonth = tripDateObj
    ? tripDateObj.toLocaleDateString("en-US", { month: "short" })
    : ""; // Get month abbreviation
  const tripDay = tripDateObj ? tripDateObj.getDate() : "TBD"; // Get day of the month or show "TBD"

  return (
    <div className="date-selector">
      <div className="calendar-icon-container">
        <button
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
          className="date-icon"
          onClick={toggleCalendar}
        >
          <div className="month">{tripMonth || " "}</div>
          <div className="day">{tripDay || "TBD"}</div>
        </button>
        <div className="date-text-container">
          <button
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
            }}
            className="date-text"
            onClick={toggleCalendar}
          >
            {formData.tripDate ? formData.tripDate : ""}
          </button>

          <button
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
            }}
            className="time-text"
            onClick={toggleTimeSelector}
          >
            {" "}
            <img src={clockIcon} alt="Departure Time Icon" />
            {formData.departureTime || "TBD"}
          </button>
        </div>
      </div>

      {isCalendarVisible && (
        <>
          <DayPicker
            mode="single"
            disabled={{ before: new Date() }}
            selected={selectedDate}
            onSelect={handleDateChange}
            className="day-picker"
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
              zIndex: 2,
            }}
          />
          <div className="calendar-button-container">
            <button
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
                zIndex: 2,
              }}
              className="calendar-button"
              onClick={() => {
                toggleCalendar();
                formData.tripDate = "TBD";
              }}
            >
              Not sure yet
            </button>
            <button
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
                zIndex: 2,
              }}
              className="calendar-button"
              onClick={toggleCalendar}
            >
              Okay
            </button>
          </div>
        </>
      )}

      {isTimeSelectorVisible && (
        <TimeSelector
          formData={formData}
          setFormData={setFormData}
          toggleTimeSelector={toggleTimeSelector}
        />
      )}
    </div>
  );
}

// if Date is TBD, set time to not show
