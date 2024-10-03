
import Header from '../components/Header/Header.jsx'
import NewTripButton from '../components/NewTripButton/NewTripButton.jsx';
import MovingCar from '../components/MovingCar/MovingCar.jsx';
import StickyNavBar from '../components/StickyNavBar/StickyNavBar.jsx';

function HomePage(){
    
    return(
    <div>
        <StickyNavBar showCreateTrip />
        <Header />
        <NewTripButton>Try It Out</NewTripButton>
        <MovingCar /> 
    </div>
    );
}
export default HomePage;