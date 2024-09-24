// js basics 



// creating a function


    // using the function keyword 


function createGreeting(userName, message = "Hello"){ 
  return "Hi, I am " + userName + ". " + message; 
}

// if a second parameter is not provided, Hello will be printed to the console 
// however this is not best practice for formatting 
console.log(createGreeting("Erin"))

// saving the value as a variable is much better for readability 
const greeting1 = createGreeting("Erin")
console.log(greeting1)

const greeting2 = createGreeting("James")
console.log(greeting2)


    // using arrow function syntax

const greet = (userName, message) => `Hi, I am ${userName}. ${message}`;


// create an object 

const user = {
    name: 'Erin',
    age: 25,
    greet() { 
        console.log('Hello')
        console.log(this.age) // use this to access the other properties in the object
    }
};

console.log(user.name);

// a function that belongs to an object is called a method 
user.greet();



// create a class "blueprint"

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    }
  greet() {
    console.log('Hi');
  }
}
    // use the constructor keyword to accept parameters and 
    // store them as properties of the object that wil be created based on the class


    // instantiate the class with the new keywork to create a new object based on that blueprint 
const user1 = new User("erin", 25);
console.log(user1);
user1.greet()



// Creating arrays 

const hobbies = ["Sports", "Cooking", "Reading"]
console.log(hobbies[0])

hobbies.push("Working");
console.log(hobbies);

const index = hobbies.findIndex((item) => {
    return item === 'Sports'; // if you were looking for the index of sports
}) // compares item to sports and returns true if it's found 
console.log(index);


// another way to write this
const sameIndex = hobbies.findIndex((item) => item === 'Sports'); 
console.log(sameIndex)

// using map allows you to transform every item in an array 
const editedHobbies = hobbies.map((item) => item + "!");
console.log(editedHobbies);

// using map also allows you to convert the data type (ex: str to object)
const editedHobbiesAsObjects = hobbies.map((item) => ({text: item})); // ({}) will not define the function body of this arrow function, it will define a new object
console.log(editedHobbiesAsObjects);




// destructing arrays
const userNameData = ["Erin", "Kerr"];

const firstName = userNameData[0]
const lastName = userNameData[1]

// alt way to do this 
const [myFirstName, myLastName] = ["Erin", "Kerr"]



// destructing objects
const {name: userName, age} = {                // just like how we used [] to deconstruct an array 
    name: 'Erin',                   // we have to use the names that are defined in the object(field names) 
    age: 25,                        // except if you want to assign an alias by using a colon ex: name: userrName
};

console.log(userName);
console.log(age);


// destructuring in function parameter lists 

// function storeOrder(order) {
//     localStorage.setItem('id', order.id);
//     localStorage.setItem('currency', order.currency);
//   }

//         // Instead of accessing the order properties via the "dot notation" 
//         // inside the storeOrder function body, you could use destructuring like this:

//   function storeOrder({id, currency}) { // destructuring
//     localStorage.setItem('id', id);
//     localStorage.setItem('currency', currency);
//   }

//         // storeOrder still only takes one parameter, not two
//         // it's one single parameter - and object which is destructured internally 

//   storeOrder({id: 5, currency: 'USD', amount: 15.99}); // one argument / value!



// special spread operator ...

const myHobbies = ["Sports", "Cooking"];
const newHobbies = ["Reading"];

const mergedHobbies = [...myHobbies, ...newHobbies]; // pulls out values from an aray and adds them to a new array  
console.log(mergedHobbies);



// control structures

// if statements 

// const password = prompt('Your password');
// if password === "Hello" , etc. 

if (10 === 10) {
    // ... 
} else if (5 === 5) {
    // ..
} else if (3 ===3) {
    // ..
} else {

}

// for loop 

const hobbiesToLoop = ["Sports", "Cooking"]
for (const hobby of hobbies) { // of will tell js to create a new constant for every item in the array
  console.log(hobby)
}   


// Manipulating the DOM - will not be doing this in react 



// using functions as values 

function handleTimeout() {
    console.log("Timed out!");
}

const handleTimeout2 = () => {
    console.log("Timed out... again!")
}

setTimeout(handleTimeout, 2000);    // no parenthesis so that they func doesn't run as soon as it's called but is instead being passed in as a value
                                    // second argument is not a function, it defines the amount of miliseconds js should wait to execute this function 
setTimeout(handleTimeout2, 3000);
setTimeout(() => {                  // can alsways make an annonomous function instead 
    console.log("More timing out...");
}, 4000)


function greeter(greetFn) { // accepts a function as a parameter but it's not called until the code block where it has parenthesis 
    greetFn();
}

greeter(() => console.log('Hi')); // passes a function into greeter



// defining functions inside of functions 

function init() {
    function greet() {
        console.log('Hi!');
    }
    greet()
}

init(); // can't call greet() because of scope 



// reference vs primitive values 


let userMessage = "Hello!";     // primitive, can't edit them 
userMessage = "Hello there!";   // you can override it 

// objects and arrays are reference values, they can be edited 

const someHobbies = ["Sports", "Cooking"];
hobbies.push("Working");         // push edits/mutates the original array 
