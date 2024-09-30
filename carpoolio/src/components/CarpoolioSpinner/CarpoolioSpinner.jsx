import { useNavigate } from "react-router-dom";

import './CarpoolioSpinner.css'
import spinnerImg from '../../assets/CarpoolioSpinner.png'


export default function CarpoolioSpinner() {
    const navigate = useNavigate();
    
    return (
        <div className="spin" onClick={() => navigate("/trip/create")}>
            <img src={spinnerImg} alt="Spinning" style={{ width: '150px', height: 'auto' }} />
        </div>
    )
}