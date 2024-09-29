import {useState} from 'react'; 

import Header from './components/Header/Header.jsx'
import CarpoolioSpinner from './components/CarpoolioSpinner/CarpoolioSpinner.jsx'
import NewTripButton from './components/NewTripButton/NewTripButton.jsx';

function App(){
    
    return(
    <div>
        <Header />
        <CarpoolioSpinner />
        <NewTripButton />
    </div>
    );
}
export default App;