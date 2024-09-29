import Header from "../components/Header/Header"
import GetUsername from "../components/GetUsername/GetUsername";

export default function NewTripPage() {
    let username = '';
    let defaultName = username || 'Stranger'; //short-circuit evaluation

    return(



        <div>
            <Header />
            <GetUsername />
            <h4>Are you the driver? </h4>
        </div>
        
    )
}