import { useState } from 'react'
import { DayPicker } from "react-day-picker";
import './TripDate.css'

export default function TripDate({ formData, setFormData, onClose }) {
  const [ selectedDate, setSelectedDate ] = useState(null)

    // Handle date change
    const handleDateChange = (date) => {
        if (date) {
            setSelectedDate(date); // Set selected date
            setFormData({ ...formData, tripDate: date.toISOString().split("T")[0] }); // Update formData with date
            onClose(); // Call onClose to hide calendar
        }
    };

  return (
    <DayPicker
      mode="single"
      disabled={{ before: new Date()}}
      selected={selectedDate}
      onSelect={handleDateChange}
    />
  );
}




// export default function TripDate({ formData, setFormData }){




//     // handle date change
//     const handleDateChange  = (event) => {
//         setSelectedDate(event.target.value);
//         setFormData({...formData, tripDate: event.target.value,});
//     }


//     return (
//     <>
//      <h4 id='form-question'>Trip Date </h4>
//      <input 
//      id='customize-trip-input'
//      type='date'
//      name='date'
//      value={selectedDate}
//      min={minDate}
//      onChange={handleDateChange} />
//     </>  
//     )

// }


