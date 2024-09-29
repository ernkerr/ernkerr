import './NewTripButton.css'

export default function NewTripButton({children}) {
    return (
        <a href="/trip/create" id="new-trip">
            <button>{children}</button>  
        </a>
            
)
}