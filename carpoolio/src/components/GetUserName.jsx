
export default function GetUserName({ formData, setFormData }){
    return(<>
     <h4>What is your name?</h4>
     <span className='user'>
            <input 
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
        </span>
    </>
    )
}