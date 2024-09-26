import reactImg from './assets/react-core-concepts.png'; // because images can get lost in deployment when written like this: <img src="src/assets/react-core-concepts.png">
import componentsImg from './assets/components.png';
import { CORE_CONCEPTS } from './data.js'

const reactDescriptions = ['Fundamental', 'Crutial', 'Core'];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}


function Header() {
  const description = reactDescriptions[genRandomInt(2)]
    return (<header>
      {/* put the imported image in curly braces  without quotes */}
      <img src={reactImg} alt="Stylized atom" /> 
      <h1>React Essentials</h1>
      {/* {reactDescriptions[genRandomInt(2)]} in between the <p> tags would work but it's less readable */}
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>);
  }

  function CoreConcept({image, title, description}) { // allows you to pass in the different prperties of the incoming object by name 
    return(
      <li>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </li>
    );
  }

function App() {
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          <CoreConcept
            title={CORE_CONCEPTS[0].title}
            description={CORE_CONCEPTS[0].description}
            image={CORE_CONCEPTS[0].image} 
            />
            <CoreConcept {...CORE_CONCEPTS[1]}/>
            <CoreConcept {...CORE_CONCEPTS[2]}/>
            <CoreConcept {...CORE_CONCEPTS[3]}/>
        </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
