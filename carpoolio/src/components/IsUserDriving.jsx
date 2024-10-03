export default function IsUserDriving({ setDrivingStatus, onDrivingStatusChange }){
  const handleAnswer = (value) => {
    setDrivingStatus(value);
    onDrivingStatusChange();
  }

    return(
      <>
        <h4 id="form-question">Are you the driver?</h4>
        <div className="button-group">
        <button className="glow-button" onClick={() => handleAnswer(false)}>No</button>
        <button className="glow-button" onClick={() => handleAnswer(true)}>Yes</button>
      </div>
        {/* <button onClick={handleNo}> not sure yet? that's cool too</button> */}
      </>
       )
}