
import Header from '../components/Header/Header.jsx'
import NewTripButton from '../components/NewTripButton/NewTripButton.jsx';
import MovingCar from '../components/MovingCar/MovingCar.jsx';

function HomePage(){
    
    return(
    <div>
        <Header />
        <NewTripButton>Try It Out</NewTripButton>
        <MovingCar /> 
    </div>
    );
}
export default HomePage;