// export default function TabButton(props) {
//     return <li><button>{props.children}</button></li>;
// };

// or using destructuring 


export default function TabButton({children, onSelect, isSelected}) {
    return (
      <li>
        <button className={isSelected ? 'active' : undefined} onClick={onSelect}>{children}</button>
      </li>
      );
};



// vs. 

// using attributes

/* <TabButton label="Components"></TabButton>

function TabButton({label}) {
  return <button>{label}</button>;
} */
