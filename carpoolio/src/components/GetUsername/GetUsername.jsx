
export default function GetUsername() {
    let username = '';
    let defaultName = username || 'Stranger'; //short-circuit evaluation

    return(
        <div>
            <h4>What is your name?</h4>
            <h4>Hello {defaultName}</h4>
        </div>
    )
}