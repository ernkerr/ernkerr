import { useParams } from 'react-router-dom';


export default function TripPage() {
    const { tripId } = useParams();

    // use tripId to query backend 
    
    return(
        <h1>Hello {tripId}</h1>
    )
}