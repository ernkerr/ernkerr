import {useState} from 'react'; 
import TabButton from '.././components/TabButton.jsx';
import Section from '.././components/Section.jsx'
import { EXAMPLES } from '.././data.js';
import Tabs from '.././components/Tabs.jsx'


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
    <Section title="Examples" id="examples"> 
      <Tabs 
      // ButtonsContainer="menu"
      buttons ={<>
      <TabButton 
        isSelected={selectedTopic === 'components'}
        onClick={() => handleSelect('components')}>
        Components</TabButton>

      <TabButton 
        isSelected={selectedTopic === 'jsx'}
        onClick={() => handleSelect('jsx')}>
        JSX</TabButton>

      <TabButton onClick={() => handleSelect('props')}
        isSelected={selectedTopic === 'props'}>
        Props</TabButton>

      <TabButton onClick={() => handleSelect('state')}
        isSelected={selectedTopic === 'state'}>
        State</TabButton></>} >{tabContent}</Tabs>
  </Section>
  )
}
