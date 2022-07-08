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

let computers = [];

//fetch computers
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToList(computers));

const addComputersToList = (computers) => {
     computers.forEach(x => addComputerToList(x)); 
     titleElement.innerText = computers[0].title;
     featuresElement.innerText = computers[0].specs;
     descriptionElement.innerText = computers[0].description;
     priceElement.innerText = computers[0].price;
     idElement.innerText = computers[0].id;
}
 
//writeout chosen computers name in select
const addComputerToList = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
  //  computerElement.appendChild(document.createTextNode(computer.features));
   // computerElement.appendChild(document.createTextNode(computer.description));
   // computerElement.appendChild(document.createTextNode(computer.price));
    computersElement.appendChild(computerElement);
}

//show everything about the chosen computer
const handleComputerListChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    titleElement.innerText = selectedComputer.title;
    descriptionElement.innerText = selectedComputer.description;
    featuresElement.innerText = selectedComputer.specs;
    priceElement.innerText = selectedComputer.price;
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
const bankBtn = () => {
    x = balance += salary;
    balanceElement.innerHTML = x;
    salary = 0;
    payElement.innerHTML = 0;
}
/*
const buyNow = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    console.log(selectedComputer);
    price = selectedComputer.price;
    console.log(selectedComputer);
    if (balance >= price) {
        
        balance = balance - price;
        bought.innerText = "You now own this computer";
    } else {
        bought.innerText = "You don't have enough money.";
    }
}
*/
function buyNow() {
    const selectedComputer = computer[computerElement.selectedIndex];
    //const selectedComputer = computers[id];
    // id = selectedComputer.id;
    //const computer = parseInt(computerElement.value);
   // console.log(id);
   // const selectedComputer = computers[e.target.selectedIndex];
    if(selectedComputer.price > balance) {
        bought.innerText = "You don't have enough money.";
    } else {
        console.log(selectedComputer.price);
        balanceElement.innerHTML = balance - selectedComputer.price;
        //balance = balance - selectedComputer.price;
        bought.innerText = `You now own ${selectedComputer.title}`;
    }
}

function takeLoan() {
    //let amount = prompt("How much would you like to borrow?");
    let amount = parseInt(prompt("How much would you like to borrow?"));
    if (!isNaN(amount)) {
        //return;
        if (amount <= 2 * balance) {
           
        balanceElement.innerHTML = balance + amount;
        myLoanElement.innerHTML = balance;
        payBack.innerHTML = "<button id='payloan'>Pay back</button>";
    
    }
}
}

//eventlisteners tu btns
computersElement.addEventListener("change", handleComputerListChange);
computerElement.addEventListener("click", handleAddComputer);

loanbtnElement.addEventListener("click", takeLoan);

payElement.addEventListener("click", workBtn);
bankElement.addEventListener("click", bankBtn);
//buyNowElement.addEventListener("click", buyNow);
