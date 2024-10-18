export default function GetTripName({ formData, setFormData }) {
  return (
    <>
      <h4 className="form-question">What would you like to call your trip? </h4>
      <input
        className="text-input"
        type="text"
        required
        placeholder="don't worry you can change it later"
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
