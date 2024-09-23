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

hobbies("Working")
console.log(hobbies)

const index = hobbies.findIndex((item) => {
    return item === 'Sports'; // if you were looking for the index of sports
}) // compares item to sports and returns true if it's found 

console.log(index);