
export default function CoreConcept({image, title, description}) { // allows you to pass in the different prperties of the incoming object by name 
    return(
      <li>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </li>
    );
  }