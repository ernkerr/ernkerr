import { useState } from 'react';
import TripName from './TripName'
import TripDate from './TripDate'
import './CustomizeTrip.css'

export default function CustomizeTrip({ formData, setFormData }){
    const [ isCalendarVisible, setIsCalendarVisible ] = useState(false);

    const toggleCalendar = () => {
        setIsCalendarVisible(prev => !prev);
    };

    function handleClick(){
    // add to database
        console.log("send data to database")
    }



    return(

    <div id='customize-trip'> 
        <TripName />
        <button onClick={toggleCalendar}>
            {formData.tripDate ? formData.tripDate : 'Set a date..'}
        </button>
        {isCalendarVisible && (
                <TripDate formData={formData} setFormData={setFormData} onClose={toggleCalendar} />
            )}

        {isCalendarVisible && <button onClick={() => {
            toggleCalendar();
            formData.tripDate = 'tbd';
        }} >Not sure yet</button>}


    
    

    {/* // destination 

    // departure time (add stops?)

    // countdown to trip y/n */}  


    <button className="glow-button" id='bottom-button'onClick={handleClick}>continue</button>


    </div>)
}