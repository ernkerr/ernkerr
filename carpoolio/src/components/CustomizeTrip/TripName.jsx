import './CustomizeTrip.css'

export default function TripName({ formData, setFormData }){
    return (
    <>
     {/* <h4 id='form-title'>Customize Trip! </h4> */}
     <input id='customize-trip-input'
        type="text"
        required
        placeholder="Untitled Trip"
        onChange={(event) => {
        setFormData({...formData, tripName: event.target.value,})
        }}></input>
    </>  
    )
}