import "./CustomizeTrip.css";

export default function TripName({ formData, setFormData }) {
  return (
    <>
      <input
        className="trip-title"
        style={{ background: formData?.tripBackground?.scrim || "transparent" }}
        type="text"
        required
        placeholder={formData.tripName}
        onChange={(event) => {
          setFormData({ ...formData, tripName: event.target.value });
        }}
      ></input>
    </>
  );
}
