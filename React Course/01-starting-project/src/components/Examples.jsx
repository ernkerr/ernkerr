import {useState} from 'react'; 
import TabButton from './components/TabButton.jsx';
import { EXAMPLES } from './data.js';


export default function Examples() {

  const [ selectedTopic, setSelectedTopic ] = useState();

  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton)
    // console.log(selectedTopic);
  }

  let tabContent = <p>Please select a topic.</p> 

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div> 
    );
  }

  return (
    <section id="examples"> 
    <h2>Examples</h2>
    <menu>
      <TabButton 
        isSelected={selectedTopic === 'components'}
        onSelect={() => handleSelect('components')}>
        Components</TabButton>

      <TabButton 
        isSelected={selectedTopic === 'jsx'}
        onSelect={() => handleSelect('jsx')}>
        JSX</TabButton>

      <TabButton onSelect={() => handleSelect('props')}
        isSelected={selectedTopic === 'props'}>
        Props</TabButton>

      <TabButton onSelect={() => handleSelect('state')}
        isSelected={selectedTopic === 'state'}>
        State</TabButton>
    </menu>
    {tabContent}
  </section>
  )
}
