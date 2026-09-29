import "./style.css";

type Operator = "%" | "x" | "+" | "-";

const topOutput = document.getElementById("top-output")!;
const bottomOutput = document.getElementById("bottom-output")!;
const clearButton = document.getElementById("clear-button")!;
const sevenButton = document.getElementById("seven-button")!;
const eightButton = document.getElementById("eight-button")!;
const nineButton = document.getElementById("nine-button")!;
const fourButton = document.getElementById("four-button")!;
const fiveButton = document.getElementById("five-button")!;
const sixButton = document.getElementById("six-button")!;
const oneButton = document.getElementById("one-button")!;
const twoButton = document.getElementById("two-button")!;
const threeButton = document.getElementById("three-button")!;
const zeroButton = document.getElementById("zero-button")!;
const divideButton = document.getElementById("divide-button")!;
const multiplyButton = document.getElementById("multiply-button")!;
const subtractButton = document.getElementById("subtract-button")!;
const addButton = document.getElementById("add-button")!;
const pointButton = document.getElementById("point-button")!;
const equalButton = document.getElementById("equal-button")!;

let buffer: number | null = null;
let currentInput: number | null = null;
let operator: Operator | null = null;
let decimal = "";
let isNewResult = false;

function render() {
  topOutput.innerText = buffer !== null ? `${buffer} ${operator}` : "";
  bottomOutput.innerText = `${currentInput ?? (operator ? "" : "0")}${decimal}`;
}

function inputDigit(digit: number) {
  if (decimal.length === 0) {
    if (currentInput && currentInput.toString().length >= 10) return;
    currentInput =
      currentInput === null || isNewResult ? digit : currentInput * 10 + digit;
  } else {
    decimal = decimal + digit;
  }
  isNewResult = false;
  render();
}

function selectOperator(selectedOperator: Operator) {
  if (buffer === null) {
    buffer = currentInput
      ? currentInput + (Number.parseFloat(decimal) || 0)
      : 0 + Number.parseFloat(decimal) || 0;
    operator = selectedOperator;
    currentInput = null;
  } else if (currentInput === null) {
    operator = selectedOperator;
  } else {
    evaluate(selectedOperator);
  }
  decimal = "";
  render();
}

function evaluate(nextOperator?: Operator) {
  if (buffer === null || operator === null || currentInput === null) return;
  switch (operator) {
    case "%":
      currentInput =
        buffer / (currentInput + (Number.parseFloat(decimal) || 0));
      break;
    case "x":
      currentInput =
        buffer * (currentInput + (Number.parseFloat(decimal) || 0));
      break;
    case "+":
      currentInput =
        buffer + (currentInput + (Number.parseFloat(decimal) || 0));
      break;
    case "-":
      currentInput =
        buffer - (currentInput + (Number.parseFloat(decimal) || 0));
      break;
    default:
      break;
  }
  operator = nextOperator ?? null;
  buffer = nextOperator ? currentInput : null;
  currentInput = nextOperator ? null : currentInput;
  decimal = "";
  isNewResult = !nextOperator;

  render();
}

render();

oneButton.addEventListener("click", () => inputDigit(1));
twoButton.addEventListener("click", () => inputDigit(2));
threeButton.addEventListener("click", () => inputDigit(3));
fourButton.addEventListener("click", () => inputDigit(4));
fiveButton.addEventListener("click", () => inputDigit(5));
sixButton.addEventListener("click", () => inputDigit(6));
sevenButton.addEventListener("click", () => inputDigit(7));
eightButton.addEventListener("click", () => inputDigit(8));
nineButton.addEventListener("click", () => inputDigit(9));
zeroButton.addEventListener("click", () => inputDigit(0));
clearButton.addEventListener("click", () => {
  // Clear
  buffer = null;
  currentInput = null;
  render();
});
divideButton.addEventListener("click", () => selectOperator("%"));
multiplyButton.addEventListener("click", () => selectOperator("x"));
addButton.addEventListener("click", () => selectOperator("+"));
subtractButton.addEventListener("click", () => selectOperator("-"));
equalButton.addEventListener("click", () => evaluate());
pointButton.addEventListener("click", () => {
  if (decimal.length === 0 && !currentInput?.toString().includes(".")) {
    if (currentInput === null) currentInput = 0;
    decimal = ".";
  }
  render();
});
