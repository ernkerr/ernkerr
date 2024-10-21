export default function GetTripName({ formData, setFormData }) {
  return (
    <>
      {/* What would you like to call your trip? */}
      <h4 className="form-question">Name your trip </h4>
      <input
        className="text-input"
        type="text"
        required
        placeholder="enter trip name here"
        onChange={(event) => {
          setFormData({
            ...formData,
            tripName: event.target.value,
          });
        }}
      />
    </>
  );
}

// flip trip every few seconds between trip, adventure, journey..
// "enter your name here"
// don't worry you can change it later"
