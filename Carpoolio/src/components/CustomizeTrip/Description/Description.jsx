export default function Description({
  formData,
  setFormData,
  isPreviewingTrip,
}) {
  return (
    <>
      {!isPreviewingTrip || formData.tripDescription ? (
        <input
          className="customize-trip-btns"
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
            border: isPreviewingTrip
              ? "2px solid transparent"
              : "2px solid rgba(255, 255, 255, 0.182)",
            borderRadius: isPreviewingTrip ? "0" : "5px",
          }}
          type="text"
          required
          placeholder={formData?.tripDescription || "Trip Description"}
          onChange={(event) => {
            setFormData({ ...formData, tripDescription: event.target.value });
          }}
        ></input>
      ) : null}
    </>
  );
}
