import { useState } from 'react'
import { ReactComponent as CarIcon} from '../../assets/default_car.svg'

import NumSeats from './NumSeats'
import CustomizeTrip from '../CustomizeTrip/CustomizeTrip.jsx'
import './CustomizeCar.css'



export default function CustomizeCar({formData}){
    const [carColor, setCarColor ] = useState(rgb(52, 189, 52));

    function chandleCarColor(){
        setCarColor(carColor === rgb(52, 189, 52) ? 'blue' : rgb(52, 189, 52)); // Toggle between colors
    }

    function handleClick(){
        <CustomizeTrip />
    }

    return(
        <>
            <NumSeats /> 

            {/* render basic car */}
           
            {/* Your imported SVG here */}
            <CarIcon fill={carColor} /> {/* Set the color dynamically */}
            <button className="glow-button" onClick={changeCarColor}>Change Car Color</button>

            
            
            <button className="glow-button" onClick={handleClick}>continue</button>
            {/* <h6>{formData.name}</h6> */}
        </>
    )
}