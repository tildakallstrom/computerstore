const balanceElement = document.getElementById("balance");
const titleElement = document.getElementById("title");
const featuresElement = document.getElementById("features");
const descriptionElement = document.getElementById("description");
const priceElement = document.getElementById("price");
const loanbtnElement = document.getElementById("loanbtn");
const payElement = document.getElementById("pay");
//const bankElement = document.getElementById.apply("bank");
const workElement = document.getElementById("work");
const computersElement = document.getElementById("computers");
const computerElement = document.getElementById("computer");

const buyNowElement = document.getElementById("buyNow");

let computers = [];

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToList(computers));

const addComputersToList = (computers) => {
     computers.forEach(x => addComputerToList(x));
     priceElement.innerText = computers[0].price; 
     titleElement.innerText = computers[0].title;
     featuresElement.innerText = computers[0].specs;
     descriptionElement.innerText = computers[0].description;
}
    
const addComputerToList = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.description));
    computersElement.appendChild(computerElement);
}

const handleComputerListChange = e => {
    const selectedComputer = computer[e.target.selectedIndex];
    priceElement.innerText = selectedComputer.price;
}

const handleAddComputer = () => {
    const selectedComputer = computer[computerElement.selectedIndex];
    const quantity = parseInt(quantityElement.value);

    const computerListItem = document.createElement("li");
    computerListItem.innerText = `${selectedComputer.title} ${selectedComputer.description} ${selectedComputer.price}`;
}



computersElement.addEventListener("change", handleComputerListChange);
computerElement.addEventListener("click", handleAddComputer);

    