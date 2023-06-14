const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close')

toggleMenu.addEventListener('click', ()=> {
    navMenu.classList.toggle('show')
})


closeMenu.addEventListener('click', ()=> {
    navMenu.classList.remove('show')
})

//tracker section//

const balance = document.getElementById (
    "balance"
);

const money__plus = document.getElementById("money__plus");
const money__minus = document.getElementById("money__minus");

const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

//const dummyTransactions = [
//    { id: 1, text: "Flower", amount: -20},
//    { id: 2, text: "Salary", amount: 300},
//    { id: 3, text: "Book", amount: -10},
//    { id: 4, text: "Camera", amount: 150},
//];

//let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('please add text and amount')
    }

    else{
      const transaction = {
        id:generateID(),
        text:text.value,
        amount:+amount.value
    }
  
    transactions.push(transaction);
  
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value='';
    amount.value='';
    }
}

//Generate Random ID
function generateID(){
    return Math.floor(Math.random()*1000000000);
}



function addTransactionDOM(transaction){
    const sign = transaction[0].amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );
    
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}

//Update updateValues

function updateValues(){
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item),0).toFixed(2);

    const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    (amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) *
    -1).toFixed(2);

    balance.innerText=`$${total}`;
    money__plus.innerText = `$${income}`;
    money__minus.innerText = `$${expense}`;
}

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}

function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

//Init App
function Init(){
    list.innerHTML= "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

Init();


form.addEventListener('submit',addTransaction);