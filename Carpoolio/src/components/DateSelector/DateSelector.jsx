import { useState, useContext, useEffect } from "react";
import { TripContext } from "@components/TripContext";
import { DayPicker } from "react-day-picker";
import { TimeSelector } from "../TimeSelector/TimeSelector";
import clockIcon from "../../assets/img/Clock.png";
import "./Calendar.css";
import "./DateSelector.css";

// go back to opening in a modal

export default function DateSelector({ isPreviewingTrip }) {
  const { formData, setFormData } = useContext(TripContext);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  // const [isTimeSelectorVisible, setIsTimeSelectorVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Close calendar and time selector when isPreviewingTrip is true
  useEffect(() => {
    if (isPreviewingTrip) {
      setIsCalendarVisible(false);
      // setIsTimeSelectorVisible(false);
    }
  }, [isPreviewingTrip]);

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  // // Toggle time selector visibility
  // const toggleTimeSelector = () => {
  //   setIsTimeSelectorVisible((prev) => !prev);
  // };

  // Handle date change
  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date); // Set selected date

      // Format date for display
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      setFormData({ ...formData, tripDate: formattedDate }); // Update formData with the selected date
      setIsCalendarVisible(false); // Close calendar after date is selected
    }
  };

  // Extract month and day for calendar icon display
  // const tripDateObj =
  //   formData.tripDate && formData.tripDate !== "TBD" // Check if tripDate is set and not "TBD"
  //     ? new Date(formData.tripDate)
  //     : null;
  // const tripMonth = tripDateObj
  //   ? tripDateObj.toLocaleDateString("en-US", { month: "short" })
  //   : ""; // Get month abbreviation or empty if "TBD"
  // const tripDay = tripDateObj ? tripDateObj.getDate() : "TBD"; // Get day of the month or show "TBD"

  const tripDateExists = formData.tripDate && formData.tripDate !== "TBD";

  return (
    <div className="date-selector">
      {/* Show calendar icon only if customizing or tripDate is set (and not "TBD") */}
      {!isPreviewingTrip && !tripDateExists ? (
        <button
          className="form-response"
          id="set-date-btn"
          onClick={toggleCalendar}
          disabled={isPreviewingTrip}
        >
          Set a Date
        </button>
      ) : (
        // Render calendar icon and trip date if trip date exists or if in previewing mode
        <div className="calendar-icon-container">
          <button
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
            }}
            className={`date-icon ${isPreviewingTrip ? "disabled" : ""}`}
            onClick={toggleCalendar}
            disabled={isPreviewingTrip}
          >
            <div className="month">
              {/* Extract month for calendar icon display */}
              {new Date(formData.tripDate).toLocaleDateString("en-US", {
                month: "short",
              })}
            </div>
            <div className="day">{new Date(formData.tripDate).getDate()}</div>
          </button>
          <div className="date-text-container">
            <button
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
              }}
              className={`date-text ${isPreviewingTrip ? "disabled" : ""}`}
              onClick={toggleCalendar}
              disabled={isPreviewingTrip}
            >
              {formData.tripDate}
            </button>
          </div>
        </div>
      )}

      {/* Render DayPicker if calendar is visible */}
      {isCalendarVisible && (
        <>
          <div className="modal">
            <div className="overlay">
              <div className="modal-content">
                <DayPicker
                  mode="single"
                  disabled={{ before: new Date() }}
                  selected={selectedDate}
                  onSelect={handleDateChange}
                />

                <div className="calendar-button-container">
                  <button
                    style={{
                      background:
                        formData?.tripBackground?.scrim || "transparent",
                    }}
                    className="calendar-button"
                    onClick={() => {
                      toggleCalendar();
                      setFormData({ ...formData, tripDate: "TBD" });
                    }}
                  >
                    Not sure yet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Render TimeSelector if time selector is visible */}
      {/* {isTimeSelectorVisible && !isPreviewingTrip && (
        <TimeSelector
          formData={formData}
          setFormData={setFormData}
          toggleTimeSelector={toggleTimeSelector}
        />
      )} */}
    </div>
  );
}
