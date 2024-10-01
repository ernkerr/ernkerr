
export default function GetUserName(){
    return(<>
     <h4>What is your name?</h4>
     <span className='user'>
            <input 
              type="text"
              required
              placeholder="enter your name here"
            />
        </span>
    </>
    )
}