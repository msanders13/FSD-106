//object constructor
function Dog(name, age) {
    this.name = name;
    this.age = age;
}

class Cat {
    // auto called when creating objects
    constructor(name, age, color){
        this.name = name;
        this.age = age;
        this.color = color;

    }

}

function objects() {

//object literal
let d1 = {

    name: "Fido",
    age: 3
};
console.log(d1);


// object constructor
let d3 = new Dog("Dude", 1);
let d4 = new Dog("Chief", 4)
console.log(d3, d4)

//classes
let c1 = new Cat("Dr.Meowsalot", 3, "white")
let c2 = new Cat("WHiskers", 2, "yellow")
console.log(c1, c2);


}


function testRequest() {
    $.ajax({
        type: 'GET',
        url: "https://restclass.azurewebsites.net/api/test",
        success: function (response) {
            console.log("response", response);
        },
        error: function (errorDetails) {
            console.log("Request failed", errorDetails);
        }
    });
}




//exec the fun
objects();

//testRequest();