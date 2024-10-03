import '../pages/NewTripForm.css'

export default function GetUserName({ formData, setFormData }){
    return(<>
     <h4 id="form-question">What is your name?</h4>
      <input id="new-trip-input"
        type="text"
        required
        placeholder="enter your name here"
        onChange={(event) => {
          setFormData({
            ...formData, 
            name: event.target.value,
          });
        }}
      />
    </>
    )
}