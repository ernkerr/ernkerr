import './CarpoolioSpinner.css'
import spinnerImg from '../../assets/CarpoolioSpinner.png'

export default function CarpoolioSpinner() {
    return (
        <div className="spin">
            <img src={spinnerImg} alt="Spinning" style={{ width: '150px', height: 'auto' }} />
        </div>
    )
}