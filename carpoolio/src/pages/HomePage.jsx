
import Header from '../components/Header/Header.jsx'
import CarpoolioSpinner from '../components/CarpoolioSpinner/CarpoolioSpinner.jsx'
import NewTripButton from '../components/NewTripButton/NewTripButton.jsx';




function HomePage(){
    
    return(
    <div>
        <Header />
        <CarpoolioSpinner />
        <NewTripButton>Try It Out</NewTripButton>
        <NewTripButton>Create trip</NewTripButton>
    </div>
    );
}
export default HomePage;