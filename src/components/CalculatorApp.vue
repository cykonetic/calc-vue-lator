<script setup lang="ts">
import { reactive } from "vue";
import CalculatorButton from "./CalculatorButton.vue";
import CalculatorDisplay from "./CalculatorDisplay.vue";

const buttonClassClear = "bg-yellow-600 text-slate-900 col-span-2";
const buttonClassDigit = "bg-slate-700 text-zinc-200";
const buttonClassOperator = "bg-orange-600 text-zinc-200";
const buttonClassEquals = "bg-slate-400 text-slate-900 col-span-2";

const displayDecimal = ".";
const displayError = "Error";
const displayDefault = "0";

const operatorAdd = "+";
const operatorClear = "C";
const operatorDivide = "÷";
const operatorEqual = "=";
const operatorMultiply = "×";
const operatorNegate = "±";
const operatorSubtract = "-";
const operatorDefault = operatorAdd;

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
  { symbol: operatorClear, onPressed: clear, class: buttonClassClear },
  { symbol: operatorEqual, onPressed: equals, class: buttonClassEquals },

  { symbol: "7", onPressed: setDigit, class: buttonClassDigit },
  { symbol: "8", onPressed: setDigit, class: buttonClassDigit },
  { symbol: "9", onPressed: setDigit, class: buttonClassDigit },
  {
    symbol: operatorDivide,
    onPressed: setOperator,
    class: buttonClassOperator,
  },

  { symbol: "4", onPressed: setDigit, class: buttonClassDigit },
  { symbol: "5", onPressed: setDigit, class: buttonClassDigit },
  { symbol: "6", onPressed: setDigit, class: buttonClassDigit },
  {
    symbol: operatorMultiply,
    onPressed: setOperator,
    class: buttonClassOperator,
  },

  { symbol: "1", onPressed: setDigit, class: buttonClassDigit },
  { symbol: "2", onPressed: setDigit, class: buttonClassDigit },
  { symbol: "3", onPressed: setDigit, class: buttonClassDigit },
  {
    symbol: operatorSubtract,
    onPressed: setOperator,
    class: buttonClassOperator,
  },

  { symbol: operatorNegate, onPressed: negate, class: buttonClassDigit },
  { symbol: "0", onPressed: setDigit, class: buttonClassDigit },
  { symbol: displayDecimal, onPressed: setDecimal, class: buttonClassDigit },
  { symbol: operatorAdd, onPressed: setOperator, class: buttonClassOperator },
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
  state.display = calculate(operatorMultiply, -1.0, input);
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
    state.operator ?? operatorDefault,
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
      state.operator ?? operatorDefault,
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
  <div class="rounded w-fit bg-slate-900 p-3">
    <div>
      <CalculatorDisplay :value="state.display"></CalculatorDisplay>
    </div>
    <div class="grid grid-cols-4 gap-1 font-bold">
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
