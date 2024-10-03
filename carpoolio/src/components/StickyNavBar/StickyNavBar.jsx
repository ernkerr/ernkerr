import './StickyNavBar.css'

export default function StickyNavBar({showCreateTrip = false}){
   return <nav id="navbar">
        <a id="logo" href="/#home">Carpoolio Logo</a>
        {showCreateTrip &&  <a id="create-trip" href="/trip/create">Create Trip</a>}
       


    </nav>
}