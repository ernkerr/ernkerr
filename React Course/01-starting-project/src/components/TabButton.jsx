// export default function TabButton(props) {
//     return <li><button>{props.children}</button></li>;
// };


// or using destructuring 


export default function TabButton({children}) {
    return (
      <li>
        <button onClick>{children}</button>
      </li>
      );
};

// This was of building components where your components can wrap other components
// or other content is called component composition 

// also known as "using children" 
// for components that take a single pice of renderable content
// esp when passing JSX code as a value to another component 




// vs. 



// using attributes
// if you have multiple but smaller peices of information that must be passed to a component 

/* <TabButton label="Components"></TabButton>

function TabButton({label}) {
  return <button>{label}</button>;
} */
