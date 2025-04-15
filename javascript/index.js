const display = document.getElementById("display");

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function clearInput() {
  display.value -= input;
}

function brackets() {
  const arr = display.value.split("");
  arr.unshift("(");
  arr.push(")");

  display.value = arr.join("");
}

function calculate() {
  try {
    display.value += " = " + eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
