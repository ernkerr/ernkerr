export default function GetUserContact(){
    return(<>
        <h4>What is your email?</h4>
        <span className='user'>
               <input 
                 type="text"
                 required
                 placeholder="we'll send you a link"
               />
           </span>
       </>
       )
}