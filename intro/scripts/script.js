console.log("Hello World!");

function sum(num1, num2){
    let result= num1 + num2;
    console.log("The result is: " + result);
    return result; //used for lines 12 and 13 as those lines return the value, result is a variable
}

function printSomeNumbers(){
    for(let i=0; i < 21; i++) {
        if(i != 7 , i != 13){
            console.log(i);
        }
        
    }
}



function sumSomeNumbers(){
    let list = [12,32,12,456,12,87,345,56,3,7,5678,2,4587,243,09,234,-3,4567,-9,0];

    let total =0;
    let pivot = list[0];

    for(let i=0; i< list.length; i++) {
        let num = list[i];
        total = total + num;

        if(num > pivot) {
            pivot = num;
        }

        if(num < smallest) {
            smallest = num;
        }
        
    }
    console.log("sum: ", total);
    console.log("biggest: ", pivot);
    console.log("smallest: ", smallest);
    //find the biggest number
}


function init(){
    console.log("DOM ready");
    //get input, assign events, load previous data, hide elements is typical for init
    let res = sum(21, 21);
    console.log(res);

    //for loops
    printSomeNumbers(); //nums from 0 to 20

    sumSomeNumbers();

};


// when the browser finishes rending all thehtml, do this
window.onload = init;