import { useState } from 'react'

import GetUserName from "./GetUserName"
import IsUserDriving from "./IsUserDriving"

export default function NewTripForm(){
    const [page, setPage] = useState(0);
    const conditionalComponent = () => {
        switch(page){
            case 0: 
              return <GetUserName />;
            case 1: 
              return <IsUserDriving />; 
            default: 
              return <GetUserName /> 
        }
    }

    function handleContinue(){
        setPage(page + 1)
    }


    return(
        <>
        {conditionalComponent()}
        <button onClick={handleContinue}>continue</button>
        </>
    )
}

