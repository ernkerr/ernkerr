import { useState } from 'react';
import './GetUsername.css'

export default function GetUsername() {
    const [ userName, setUserName ] = useState('');
    // const [ isEditing, setIsEditing ] = useState(false);

    // function handleClick(){
    //     setIsEditing(editing => !editing);
    // }

    function handleChange(event){
        setUserName(event.target.value)
    }


    // let editableUserName = <span className='user-name'>{userName}</span>

    // if (isEditing){
    //     editableUserName = <input type="text" required value={userName} onChange={handleChange}/>
    // }

    return(
        <>
        <h4>What is your name?</h4>
        <span className='user'>
            {/* {editableUserName} */}
            <input 
              type="text"
              required
              value={userName}
              onChange={handleChange}
              placeholder=" "
            />
        </span>
        {/* <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
             */}
            <h4>Hello {userName || 'there'}</h4>
        </>
    )
}



// TODO: uncomment lines after making an 'editable' name component
// TODO: save username to backend 