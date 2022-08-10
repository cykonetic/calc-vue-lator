<script setup lang="ts">
import { reactive } from "vue";
import CalculatorButton from "./CalculatorButton.vue";
import CalculatorDisplay from "./CalculatorDisplay.vue";

interface Calculator {
  register: number | null;
  opperator: string | null;
  display: string;
  waitingForNext: boolean;
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
  register: null,
  opperator: null,
  display: "0",
  waitingForNext: false,
});

const buttons: Button[] = [
  {
    symbol: "C",
    onPressed: clear,
    class: "bg-yellow-600 text-slate-900 col-span-2",
  },
  {
    symbol: "=",
    onPressed: setOpperator,
    class: "bg-slate-400 text-slate-900 col-span-2",
  },
  { symbol: "7", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "8", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "9", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  {
    symbol: "÷",
    onPressed: setOpperator,
    class: "bg-orange-600 text-zinc-200",
  },
  { symbol: "4", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "5", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "6", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  {
    symbol: "×",
    onPressed: setOpperator,
    class: "bg-orange-600 text-zinc-200",
  },
  { symbol: "1", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "2", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: "3", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  {
    symbol: "-",
    onPressed: setOpperator,
    class: "bg-orange-600 text-zinc-200",
  },
  { symbol: "±", onPressed: negate, class: "bg-slate-700 text-zinc-200" },
  { symbol: "0", onPressed: setDigit, class: "bg-slate-700 text-zinc-200" },
  { symbol: ".", onPressed: setDecimal, class: "bg-slate-700 text-zinc-200" },
  {
    symbol: "+",
    onPressed: setOpperator,
    class: "bg-orange-600 text-zinc-200",
  },
];

function clear(): void {
  state.register = null;
  state.display = "0";
  state.waitingForNext = false;
  state.opperator = null;
}

function negate(): void {
  state.display = (parseFloat(state.display) * -1.0).toString();
}

function setOpperator(key: string): void {
  const input = parseFloat(state.display);

  if (state.waitingForNext && key !== "=") {
    state.opperator = key;
    return;
  }

  if (state.register === null && !isNaN(input)) {
    state.register = input;
  } else if (state.register !== null && state.opperator !== null) {
    state.register = calculate(state.opperator, state.register, input);
    // Limit display precision
    state.display = parseFloat(state.register.toFixed(7)).toString();
  }

  if (key === "=") {
    state.register = input;
  } else {
    state.opperator = key;
  }
  state.waitingForNext = true;
}

function setDecimal(): void {
  if (state.waitingForNext) {
    state.display = "0.";
    state.waitingForNext = false;
    return;
  }
  if (!/\./.test(state.display)) {
    state.display += ".";
  }
}

function setDigit(key: string): void {
  if (state.waitingForNext) {
    state.display = key;
    state.waitingForNext = false;
  } else {
    state.display = state.display === "0" ? key : state.display + key;
  }
}

function calculate(
  opperator: string,
  leftOpperand: number,
  rightOpperand: number
): number {
  switch (opperator) {
    case "×":
      return leftOpperand * rightOpperand;
    case "÷":
      return leftOpperand / rightOpperand;
    case "-":
      return leftOpperand - rightOpperand;
    case "+":
      return leftOpperand + rightOpperand;
    default:
      return rightOpperand;
  }
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
