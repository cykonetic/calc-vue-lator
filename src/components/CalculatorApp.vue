<script setup lang="ts">
import { reactive } from "vue";
import CalculatorButton from "./CalculatorButton.vue";
import CalculatorDisplay from "./CalculatorDisplay.vue";

const buttonClassClear = "bg-yellow-600 text-slate-900 col-span-2";
const buttonClassDigit = "bg-slate-500 text-zinc-200";
const buttonClassOper = "bg-orange-600 text-zinc-200";
const buttonClassEquals = "bg-slate-400 text-slate-900 col-span-2";

const digitOne = "1";
const digitTwo = "2";
const digitThree = "3";
const digitFour = "4";
const digitFive = "5";
const digitSix = "6";
const digitSeven = "7";
const digitEight = "8";
const digitNine = "9";
const digitZero = "0";

const displayDecimal = ".";
const displayError = "Error";
const displayDefault = digitZero;

const operAdd = "+";
const operClear = "C";
const operDivide = "÷";
const operEqual = "=";
const operMultiply = "×";
const operNegate = "±";
const operSubtract = "-";
const operDefault = operAdd;

interface Calculator {
  register: number; // value of left-side (stored)
  operator: string | null; // operation
  display: string; // value of right-side
  waiting: boolean; // user input expected (defaults will complete operations)
  executed: boolean; // last operation complete
  error: boolean; // last calculation Infinity or NaN
}

interface HandleInput {
  (key: string): void;
}

interface Button {
  symbol: string;
  onPressed: HandleInput;
  class: string;
}

const state: Calculator = reactive({
  register: 0,
  operator: null,
  display: displayDefault,
  waiting: true,
  executed: true,
  error: false,
});

const buttons: Button[] = [
  { symbol: operClear, onPressed: clear, class: buttonClassClear },
  { symbol: operEqual, onPressed: equals, class: buttonClassEquals },

  { symbol: digitSeven, onPressed: setDigit, class: buttonClassDigit },
  { symbol: digitEight, onPressed: setDigit, class: buttonClassDigit },
  { symbol: digitNine, onPressed: setDigit, class: buttonClassDigit },
  { symbol: operDivide, onPressed: setOperator, class: buttonClassOper },

  { symbol: digitFour, onPressed: setDigit, class: buttonClassDigit },
  { symbol: digitFive, onPressed: setDigit, class: buttonClassDigit },
  { symbol: digitSix, onPressed: setDigit, class: buttonClassDigit },
  { symbol: operMultiply, onPressed: setOperator, class: buttonClassOper },

  { symbol: digitOne, onPressed: setDigit, class: buttonClassDigit },
  { symbol: digitTwo, onPressed: setDigit, class: buttonClassDigit },
  { symbol: digitThree, onPressed: setDigit, class: buttonClassDigit },
  { symbol: operSubtract, onPressed: setOperator, class: buttonClassOper },

  { symbol: operNegate, onPressed: negate, class: buttonClassDigit },
  { symbol: digitZero, onPressed: setDigit, class: buttonClassDigit },
  { symbol: displayDecimal, onPressed: setDecimal, class: buttonClassDigit },
  { symbol: operAdd, onPressed: setOperator, class: buttonClassOper },
];

function clear(): void {
  state.register = 0;
  state.operator = null;
  state.display = displayDefault;
  state.waiting = true;
  state.executed = true;
  state.error = false;
}

function clearError(): void {
  if (!state.error) {
    return;
  }
  state.display = displayDefault;
  state.error = false;
}

function calculate(
  operator: string,
  leftOpperand: number,
  rightOpperand: number
): string {
  let result: number;
  switch (operator) {
    case "×":
      result = leftOpperand * rightOpperand;
      break;
    case "÷":
      result = leftOpperand / rightOpperand;
      break;
    case "-":
      result = leftOpperand - rightOpperand;
      break;
    default: // case "+":
      result = leftOpperand + rightOpperand;
  }
  state.error = Number.isNaN(result) || Infinity === result;

  return state.error ? displayError : parseFloat(result.toFixed(7)).toString();
}

function negate(): void {
  !state.error || clearError();
  const input = parseFloat(state.display);
  state.display = calculate(operMultiply, -1.0, input);
}

function equals(): void {
  !state.error || clearError();
  let input = parseFloat(state.display);
  if (!(state.executed || state.waiting)) {
    const swap = state.register;
    state.register = input;
    input = state.waiting ? 0 : swap;
  }
  state.display = calculate(
    state.operator ?? operDefault,
    input,
    state.register
  );
  state.executed = state.waiting = true;
}

function setDecimal(): void {
  if (/\./.test(state.display)) {
    return;
  }
  if (!state.waiting) {
    state.display += displayDecimal;
    return;
  }
  !state.error || clearError();
  state.display = displayDefault + displayDecimal;
  state.waiting = false;
}

function setDigit(key: string): void {
  if (!state.waiting) {
    state.display =
      displayDefault === state.display ? key : state.display + key;
    return;
  }
  !state.error || clearError();
  state.display = key;
  state.waiting = false;
}

function setOperator(key: string): void {
  !state.error || clearError();
  if (!(state.executed || state.waiting)) {
    state.display = calculate(
      state.operator ?? operDefault,
      state.register,
      parseFloat(state.display)
    );
  }
  state.register = parseFloat(state.display);
  state.operator = key;
  state.executed = false;
  state.waiting = true;
}
</script>

<template>
  <div class="rounded-md w-fit bg-blue-900 p-3">
    <div>
      <CalculatorDisplay
        :value="state.display + (/\./.test(state.display) ? '' : '.')"
      ></CalculatorDisplay>
    </div>
    <div class="grid grid-cols-4 gap-2 font-bold">
      <CalculatorButton
        v-for="(button, index) in buttons"
        :key="index"
        :value="button.symbol"
        :class="button.class"
        @pressed="button.onPressed"
      ></CalculatorButton>
    </div>
  </div>
</template>
