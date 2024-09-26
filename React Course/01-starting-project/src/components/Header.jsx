import reactImg from '../assets/react-core-concepts.png'; // because images can get lost in deployment when written like this: <img src="src/assets/react-core-concepts.png">
import './Header.css';

const reactDescriptions = ['Fundamental', 'Crutial', 'Core'];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}


export default function Header() {
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

