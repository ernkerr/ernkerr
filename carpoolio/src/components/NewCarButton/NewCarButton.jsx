export default function NewCarButton({ formData, setFormData }) {
  function handleClick() {
    // add to database

    console.log("send data to database");
    console.log(formData);
  }
  return (
    <button onClick={handleClick} className="glow-button" id="add-a-car">
      add a car
    </button>
  );
}
