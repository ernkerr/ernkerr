import { useState } from 'react';

import GetUserName from "../components/GetUserName";
import IsUserDriving from "../components/IsUserDriving";
import GetUserContact from '../components/GetUserContact';
import './NewTripForm.css'

export default function NewTripForm(){
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })
    const [isDriving, setIsDriving] = useState(null)

    const conditionalComponent = () => {
        switch(page){
            case 0: 
              return <GetUserName formData={formData} setFormData={setFormData} />;
            case 1: 
              return <GetUserContact formData={formData} setFormData={setFormData} />;
            case 2: 
              return <IsUserDriving setDrivingStatus={setIsDriving} onDrivingStatusChange={() => setPage(3)}/>; 
            case 3: 
              return isDriving ? <CustomizeCar /> : <CustomizeTrip />;
            default: 
              return <GetUserName formData={formData} setFormData={setFormData}/> 
        }
    }

    function handleContinue(){
        setPage(page + 1)
    }



    return(
      <div className="full-screen-wrapper">
        <div className="container-wrapper">
          <div className="container"> 
          {conditionalComponent()}
          <div className="button-group">
          {page > 0 && <button className="glow-button" onClick={() => setPage(page - 1)}>back</button>}
          {page < 2 && <button className="glow-button" onClick={handleContinue}>continue</button>}
          </div>
          </div>
        </div>
      </div>
    )
}

