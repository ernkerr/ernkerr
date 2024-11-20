import { useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import { TripContext } from "@components/TripContext";
import CarNotes from "./CarNotes";
import "@components/DateSelector/DateSelector.css";
import "@components/DateSelector/Calendar.css";

export default function CarDetails({ isPreviewingTrip, activeCarIndex }) {
  const { formData, setFormData } = useContext(TripContext);

  // date of departure
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // time of departure

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev); // toggle calendr visibility
  };

  const handleDateChange = (date) => {
    const formattedDate = date
      ? date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
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

  // departure date / time / location
  // car notes -> car chat?
  // spotify playlist

  const departureDateExists = !!formData?.cars?.[activeCarIndex]?.departureDate; // !! converts it to a bool

  return (
    <>
      <div className="departure-date-time-container">
        {departureDateExists ? (
          <button className="departure-details-btns" onClick={toggleCalendar}>
            {formData?.cars?.[activeCarIndex]?.departureDate}
          </button>
        ) : (
          <button className="departure-details-btns" onClick={toggleCalendar}>
            Pick a date
          </button>
        )}
      </div>

      {/* {!isPreviewingTrip && isCalendarVisible && ( */}
      {isCalendarVisible && (
        <>
          <div className="modal-departure-date">
            <div className="overlay-departure-date">
              <div className="modal-content-departure-date">
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
                    handleDateChange(null);
                  }}
                >
                  Not sure yet
                </button>
              </div>
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
