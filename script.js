const transactionEl = document.querySelector('.transactions');
const balanceNumberEl = document.querySelector('.balance-number');
const incomeNumberEl = document.querySelector('.number--income');
const numberExpensesEl = document.querySelector('.number--expenses');
const formEl = document.querySelector('.form');
const inputDescriptionEl = document.querySelector('.input--description');
const inputAmountEl = document.querySelector('.input--amount');

const submitHandler = (event) => {
  //prevent default behaviour
  event.preventDefault();

  //get input values
  const description = inputDescriptionEl.value;
  const amount = +inputAmountEl.value;

  //create transaction HTML list item
  const transactionItemHTML = `
        <li class="transaction transaction--${amount > 0 ? 'income' : 'expense'}">
          <span class="transaction__text">${description}</span>
          <span class="transaction__amount">${amount > 0 ? '+' : ''}${amount}</span>
          <button class="transaction__btn">X</button>
        </li>
`;

  //insert the new HTML item
  transactionEl.insertAdjacentHTML('beforeend', transactionItemHTML);
  //clear the form inputs
  inputDescriptionEl.value = '';
  inputAmountEl.value = '';
  //unfocus (blur) form inputs
  inputDescriptionEl.blur();
  inputAmountEl.blur();

  //update income or expenses
  if (amount > 0) {
    const currentIncome = +incomeNumberEl.textContent;
    const updatedIncome = currentIncome + amount;
    incomeNumberEl.textContent = updatedIncome;
  } else {
    const currentExpenses = +numberExpensesEl.textContent;
    const updatedExpenses = currentExpenses + amount * -1;
    numberExpensesEl.textContent = updatedExpenses;
  }


  //update balance
  const income = +incomeNumberEl.textContent;
  const expenses = +numberExpensesEl.textContent;
  const updatedBalance = income - expenses;
  balanceNumberEl.textContent = updatedBalance;

  // change test to red if the balance is negative
  if (income - expenses < 0) {
    balanceNumberEl.style.color = 'red';
  }
}

formEl.addEventListener('submit', submitHandler);
  




const clickHandler = (event) => {
    //remove transaction items visually
    const clickedEl = event.target.parentNode;
    clickedEl.remove();
    
    //update income or expenses
    const amountEl = clickedEl.querySelector('.transaction__amount');
    const amount = +amountEl.textContent;
    
    if (amount > 0) {
      const currentIncome = +incomeNumberEl.textContent;
      const updatedIncome = currentIncome - amount;
      incomeNumberEl.textContent = updatedIncome;
    } else {
      const currentExpenses = +numberExpensesEl.textContent;
      const updatedExpenses = currentExpenses - amount * -1;
      numberExpensesEl.textContent = updatedExpenses;
    }
    
    //update the balance
    const income = +incomeNumberEl.textContent;
    const expenses = +numberExpensesEl.textContent;
    balanceNumberEl.textContent = income - expenses;
    
    // change test to red if the balance is negative
    if (income - expenses < 0) {
      balanceNumberEl.style.color = 'red';
    }
    //the above if condition can also be written as a ternary operator
    // income - expenses < 0 ? balanceNumberEl.style.color = 'red' : '';
}


transactionEl.addEventListener('click', clickHandler);


