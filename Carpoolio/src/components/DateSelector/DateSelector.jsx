import { useState, useContext, useEffect } from "react";
import { TripContext } from "@components/TripContext";
import { DayPicker } from "react-day-picker";
import { TimeSelector } from "../TimeSelector/TimeSelector";
import clockIcon from "../../assets/img/Clock.png";
import "./Calendar.css";
import "./DateSelector.css";

export default function DateSelector({ isPreviewingTrip }) {
  const { formData, setFormData } = useContext(TripContext);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isTimeSelectorVisible, setIsTimeSelectorVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (isPreviewingTrip) {
      setIsCalendarVisible(false);
      setIsTimeSelectorVisible(false);
    }
  }, [isPreviewingTrip]); // close calendar and time selector when previewing

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev); // toggle calendr visibility
  };

  const toggleTimeSelector = () => {
    setIsTimeSelectorVisible((prev) => !prev); // toggle time selector visibility
  };

  // handle date change
  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);

      // format date for display
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      setFormData({ ...formData, tripDate: formattedDate });
      setIsCalendarVisible(false);
    }
  };

  const tripDateExists = formData.tripDate && formData.tripDate !== "TBD";
  const tripTimeExists = formData.tripTime && formData.tripTime !== "TBD";

  return (
    <div className="date-selector">
      {/* show calendar icon only if customizing and tripDate is set (not null or "TBD") */}
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
        // show calendar icon and trip date if trip date exists or if in previewing mode
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
              {/* extract month for calendar icon display */}
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
            {tripTimeExists && (
              <button
                style={{
                  background: formData?.tripBackground?.scrim || "transparent",
                }}
                className="time-text"
                onClick={toggleTimeSelector}
              >
                <img src={clockIcon} alt="Departure Time Icon" />
                {formData.tripTime}
              </button>
            )}
          </div>
        </div>
      )}

      {/* open modal if calendar is visible */}
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
        </>
      )}

      {!isPreviewingTrip && tripDateExists && !tripTimeExists ? (
        <button
          className="form-response"
          id="set-time-btn"
          onClick={toggleTimeSelector}
          disabled={isPreviewingTrip}
        >
          Set a Time
        </button>
      ) : null}

      {isTimeSelectorVisible && !isPreviewingTrip && (
        <>
          <div className="modal">
            <div className="overlay">
              <div className="modal-content">
                <TimeSelector
                  formData={formData}
                  setFormData={setFormData}
                  toggleTimeSelector={toggleTimeSelector}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
