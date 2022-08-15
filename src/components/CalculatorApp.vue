<script setup lang="ts">
import { reactive, computed } from "vue";
import CalculatorButton from "./CalculatorButton.vue";
import CalculatorDisplay from "./CalculatorDisplay.vue";

interface Calculator {
  register: number;
  operator: string;
  display: string;
  waiting: boolean;
  executed: boolean;
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
  operator: "+",
  display: "0",
  waiting: true,
  executed: true,
});

const buttons: Button[] = [
  {
    symbol: "C",
    onPressed: clear,
    class: "bg-yellow-600 text-slate-900 col-span-2",
  },
  {
    symbol: "=",
    onPressed: equals,
    class: "bg-slate-400 text-slate-900 col-span-2",
  },
  { symbol: "7", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "8", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "9", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  {
    symbol: "÷",
    onPressed: setOperator,
    class: "bg-orange-600 text-zinc-200",
  },
  { symbol: "4", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "5", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "6", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  {
    symbol: "×",
    onPressed: setOperator,
    class: "bg-orange-600 text-zinc-200",
  },
  { symbol: "1", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "2", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "3", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  {
    symbol: "-",
    onPressed: setOperator,
    class: "bg-orange-600 text-zinc-200",
  },
  { symbol: "±", onPressed: negate, class: "bg-slate-700 text-zinc-200" },
  { symbol: "0", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: ".", onPressed: setDecimal, class: "bg-slate-700 text-zinc-200" },
  {
    symbol: "+",
    onPressed: setOperator,
    class: "bg-orange-600 text-zinc-200",
  },
];

function calculate(
  operator: string,
  leftOpperand: number,
  rightOpperand: number
): number {
  let result;
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

  return parseFloat(result.toFixed(7));
}

function clear(): void {
  state.register = 0;
  state.operator = "+";
  state.display = "0";
  state.waiting = true;
  state.executed = true;
}

function negate(): void {
  const input = parseFloat(state.display);
  const result = calculate("×", -1.0, input);
  state.display = parseFloat(result.toFixed(7)).toString();
}

function setDecimal(): void {
  if (state.waiting) {
    state.display = "0.";
    state.waiting = false;
    return;
  }
  if (!/\./.test(state.display)) {
    state.display += ".";
  }
}

function setDigit(key: string): void {
  if (state.waiting) {
    state.display = key;
    state.waiting = false;
    return;
  }
  state.display = "0" === state.display ? key : state.display + key;
}

function equals(): void {
  let input = parseFloat(state.display);

  if (!state.executed) {
    const swap = state.register;
    state.register = input;
    input = state.waiting ? 0 : swap;
  }

  const result = calculate(state.operator, state.register, input);
  state.display = result.toString();
  state.executed = state.waiting = true;
}

function setOperator(key: string): void {
  if (!state.waiting && !state.executed) {
    const input = parseFloat(state.display);
    const result = calculate(state.operator, state.register, input);
    state.display = result.toString();
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
