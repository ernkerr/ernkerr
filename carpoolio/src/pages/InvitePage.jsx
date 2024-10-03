import Header from "../components/Header/Header.jsx"
import NewTripButton from '../components/NewTripButton/NewTripButton.jsx';
import NewCarButton from "../components/NewCarButton/NewCarButton.jsx";

export default function NewTripPage() {
    return(
        <>
          <Header />
          <NewCarButton newCarBtnText="Add a car"/> 
          <NewTripButton>Create your own trip</NewTripButton>
        </>

        
    )
}