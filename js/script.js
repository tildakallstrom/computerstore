const balanceElement = document.getElementById("balance");
const titleElement = document.getElementById("title");
const featuresElement = document.getElementById("features");
const descriptionElement = document.getElementById("description");
const priceElement = document.getElementById("price");
const loanbtnElement = document.getElementById("loanbtn");
const payElement = document.getElementById("pay");
const bankElement = document.getElementById("bank");
const workElement = document.getElementById("work");
const computersElement = document.getElementById("computers");
const computerElement = document.getElementById("computer");
const boughtElement = document.getElementById("bought");
const buyNowElement = document.getElementById("buyNow");
const idElement = document.getElementById("id");
const myLoanElement = document.getElementById("myLoan");
const errorElement = document.getElementById("error");
const payLoanElement = document.getElementById("payloan");
const imgElement = document.getElementById("img");

let computers = [];
//let myLoan = 0;

//fetch computers
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToList(computers));

    //writeout chosen computers name in select
const addComputersToList = (computers) => {
     computers.forEach(x => addComputerToList(x)); 
     titleElement.innerText = computers[0].title;
     featuresElement.innerText = computers[0].specs;
     descriptionElement.innerText = computers[0].description;
     priceElement.innerText = computers[0].price;
     imgElement.innerHTML = "<img src='https://noroff-komputer-store-api.herokuapp.com/" + computers[0].image + "'>";
    // idElement.innerText = computers[0].id;
}
 //add computers to selectlist
const addComputerToList = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
  //  computerElement.appendChild(document.createTextNode(computer.features));
   // computerElement.appendChild(document.createTextNode(computer.description));
   // computerElement.appendChild(document.createTextNode(computer.price));
    computersElement.appendChild(computerElement);
}

let computerId = 0;
//show everything about the chosen computer
const handleComputerListChange = e => {
    computerId = e.target.selectedIndex; //////////
    const selectedComputer = computers[e.target.selectedIndex];
    titleElement.innerText = selectedComputer.title;
    descriptionElement.innerText = selectedComputer.description;
    featuresElement.innerText = selectedComputer.specs;
    priceElement.innerText = selectedComputer.price;
    imgElement.innerHTML = "<img src='https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image + "'>";

}

//handle chosen computer
const handleAddComputer = () => {
    const selectedComputer = computer[computerElement.selectedIndex];
    //const quantity = parseInt(quantityElement.value);
    const computerListItem = document.createElement("li");
    computerListItem.innerText = `${selectedComputer.title} ${selectedComputer.description} ${selectedComputer.price}`;
}

//payout salary
let salary = 0;
const workBtn = () => {
    //increase with 100 with every click
    salary += 100;
    payElement.innerHTML = salary;
}

//move money from pay to balance
let balance = 0;
let myLoan = 0;
let pay = 0;
const bankBtn = () => {
    //if you have a loan
   if (!myLoanElement.innerHTML == null || !myLoanElement.innerHTML == 0) {
       //define 
       myLoanElement.innerHTML = myLoan;
       balanceElement.innerHTML = balance;
        //set myloan = myloan - 10% of salary
        myLoan = myLoan - salary * .1;
        //set balance = balance + 90% of salary
        balance = balance + salary * .9;
        //if 10% of salary is more than loan
        if (myLoan < 0) {
            salary = -myLoan;
        } else {
            salary = 0;
        }
        payElement.innerHTML = salary;
        
      } else {
        //if you dont have a loan, transfer pay to balance
        x = balance += salary;
        balanceElement.innerHTML = x;
        salary = 0;
        payElement.innerHTML = 0;

    }
    
}
/*
let buyNowId = 0;
const selectComputerChange = e => {
    buyNowId = e.target.selectedIndex;
    const selectedComputer = computers[e.target.selectedIndex];
    price = selectedComputer.price;
    if (balance >= price) {
        balance = balance - price;
        bought.innerText = "You now own this computer";
    } else {
        bought.innerText = "You don't have enough money.";
    }
}
*/
//let price = 0;
function buyNow() {
    balanceElement.innerHTML = balance;
    //get selected computers price
    price = computers[computerId].price;
    
    if(price > balance) {
        //if price is more than balance
        bought.innerText = "You don't have enough money.";
    } else {
        //pay from balance
        balance = balance - price;
        //buy computer
        bought.innerText = `You now own this computer.`;
    }
}

function takeLoan() {
    //show prompt and let user fill in how much he would like to borrow
    let amount = parseInt(prompt("How much would you like to borrow?"));
    
    if (!isNaN(amount)) {
        // if you already have a loan, show errormsg, else let person take loan
        if (myLoanElement.innerHTML == null || myLoanElement.innerHTML == 0) {
        //if amount is lesser than 2 * balance, let person take loan
        if (amount <= 2 * balance) {
        
        //add amount to balance
        balance += amount;
        balanceElement.innerHTML = balance;
        //show borrowed money
        myLoanElement.innerHTML = myLoan = amount;

        //show payback btn
        payloan.style.display = 'block';
    
    } 
       } else {
        error.innerHTML = "You have to payback your existing loan to get a new one.";
    }

}
}


//payback loan
const payLoanBtn = () => {
    //if you have a loan
    if (!myLoanElement.innerHTML == null || !myLoanElement.innerHTML == 0) {
          //if balance is more than the loan
        if (balance > myLoan) {
            // set balance to balance - paybacked loan
           balanceElement.innerHTML = balance -= myLoan;
           // clear loan
           myLoanElement.innerHTML = "";
        } else {
            error.innerhtml = "You don't have enough money to payback your loan."
        }
    }

}

//eventlisteners to btns
computersElement.addEventListener("change", handleComputerListChange);
computerElement.addEventListener("click", handleAddComputer);

loanbtnElement.addEventListener("click", takeLoan);

payElement.addEventListener("click", workBtn);
bankElement.addEventListener("click", bankBtn);
payLoanElement.addEventListener("click", payLoanBtn);

//selectComputerChange.addEventListener("change", selectComputerChange);
buyNowElement.addEventListener("click", buyNow);
