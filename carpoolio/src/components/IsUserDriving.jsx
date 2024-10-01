
export default function IsUserDriving(){
    return(<>
        <h4>Are you the driver?</h4>
        <span className='user'>
               <input 
                 type="text"
                 required
                 placeholder="Y/N"
               />
           </span>
       </>
       )
}