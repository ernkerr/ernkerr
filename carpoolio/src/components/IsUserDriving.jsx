import { useState } from 'react'

export default function IsUserDriving({ setDrivingStatus, onDrivingStatusChange }){
  const handleAnswer = (value) => {
    setDrivingStatus(value);
    onDrivingStatusChange();
  }

    return(
      <>
        <h4>Are you the driver?</h4>
        <button onClick={() => handleAnswer(true)}>Yes</button>
        <button onClick={() => handleAnswer(false)}>No</button>
        {/* <button onClick={handleNo}> not sure yet? that's cool too</button> */}
      </>
       )
}