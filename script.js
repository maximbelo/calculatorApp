"use strict";

// ===========================================
// Our Variables
// ===========================================
const displayOneEl = document.querySelector(".displayOne");
const displayTwoEl = document.querySelector(".displayTwo");
const tempResultsEl = document.querySelector(".tempResults");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalsEl = document.querySelector(".equals");
const resetEl = document.querySelector(".reset");
const deleteEl = document.querySelector(".delete");

let displayOne = "";
let displayTwo = "";
let result = null;
let lastOperation = "";
let hasDot = false;

// Looping through each numbersEl
numbersEl.forEach((number) => {
  // Listening for click on each element
  number.addEventListener("click", (e) => {
    // Checking to make sure that only one . is added
    if (e.target.innerText === "." && !hasDot) {
      hasDot = true;
    } else if (e.target.innerText === "." && hasDot) {
      return;
    }
    // Setting displayTwo to e.target.innerText
    displayTwo += e.target.innerText;
    // Appending it to the page
    displayTwoEl.innerText = displayTwo;
  });
});

//Looping through each operationsEl
operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    // If there is no number selected we just return as the operations cannot run
    if (!displayTwo) {
      return;
    }
    // Setting hasDot to false to allow the second num to have a .
    hasDot = false;
    // Selecting the operation
    const operationName = e.target.innerText;
    if (displayOne && displayTwo && lastOperation) {
      mathOperation();
    } else {
      // Parsing our displayTwo string to a number
      result = parseFloat(displayTwo);
    }
    // Passing operationName as the argument to the clearDisplay function
    clearDisplay(operationName);
    lastOperation = operationName;
    console.log(result);
  });
});

// Function to clear display -> set displayOne to displayTwo num + the operand, clear displayTwo(El), set the results HTML to equal the output
const clearDisplay = (name = "") => {
  displayOne += displayTwo + " " + name + " ";
  displayOneEl.innerText = displayOne;
  displayTwoEl.innerText = "";
  displayTwo = "";
  tempResultsEl.innerText = result;
};

// Calculator functionality
const mathOperation = () => {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(displayTwo);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(displayTwo);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(displayTwo);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(displayTwo);
  }
};

// Getting results by clicking =
equalsEl.addEventListener("click", (e) => {
  // Checking to see that we have both numbers
  if (!displayOne && !displayTwo) {
    return;
  }
  hasDot = false;
  mathOperation();
  clearDisplay();
  displayTwoEl.innerText = result;
  tempResultsEl.innerText = "";
  displayTwo = result;
  displayOne = "";
});

// Resetting the page
resetEl.addEventListener("click", (e) => {
  displayOneEl.innerText = "0";
  displayTwoEl.innerText = "0";
  displayOne = "";
  displayTwo = "";
  result = "";
  tempResultsEl.innerText = "0";
});

// Deleting the last element to allow the user to re-enter the number if they made a mistake
deleteEl.addEventListener("click", (e) => {
  displayTwoEl.innerText = "";
  displayTwo = "";
});
