import { useState, useContext, useEffect } from "react";
import { TripContext } from "@components/TripContext";
import { formResponseStyle } from "@styles/styles";
import { DayPicker } from "react-day-picker";
import { TimeSelector } from "../TimeSelector/TimeSelector";
import clockIcon from "../../assets/img/clock.png";
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
    <>
      {/* show calendar icon only if customizing and tripDate is set (not null or "TBD") */}
      {!isPreviewingTrip && !tripDateExists ? (
        <button
          className="form-response"
          style={formResponseStyle({ formData, isPreviewingTrip })}
          onClick={toggleCalendar}
          disabled={isPreviewingTrip}
        >
          Set a Date
        </button>
      ) : null}

      {tripDateExists && (
        <div
          className="form-response"
          style={formResponseStyle({ formData, isPreviewingTrip })}
        >
          <div className="calendar-icon-container">
            <button
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
                className={`date-text ${isPreviewingTrip ? "disabled" : ""}`}
                onClick={toggleCalendar}
                disabled={isPreviewingTrip}
              >
                {formData.tripDate}
              </button>
              {tripTimeExists && (
                <button className="time-text" onClick={toggleTimeSelector}>
                  <img src={clockIcon} alt="Departure Time Icon" />
                  {formData.tripTime}
                </button>
              )}
            </div>
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
                  className="calendar-button"
                  onClick={() => {
                    toggleCalendar();
                    setFormData({ ...formData, tripDate: null });
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
          className={`form-response ${isPreviewingTrip ? "disabled" : ""}`}
          style={{
            background: isPreviewingTrip
              ? "transparent"
              : formData?.tripBackground?.scrim || undefined,
            pointerEvents: isPreviewingTrip ? "none" : "auto",
          }}
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
                  toggleTimeSelector={toggleTimeSelector}
                  onTimeChange={(time) =>
                    setFormData({ ...formData, tripTime: time })
                  }
                  // this arrow function recieves the selected time as its argument
                  // then it spreads the existing formData (to kep all other fields unchanged)
                  // then it updates the tripTime field with the selected time
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
