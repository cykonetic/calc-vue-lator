<script setup lang="ts">
import { reactive } from "vue";
import CalculatorButton from "./CalculatorButton.vue";
import CalculatorDisplay from "./CalculatorDisplay.vue";

const buttonClassClear = "bg-yellow-600 text-slate-900 col-span-2";
const buttonClassDigit = "bg-slate-500 text-zinc-200";
const buttonClassEquals = "bg-slate-400 text-slate-900 col-span-2";
const buttonClassOper = "bg-orange-600 text-zinc-200";

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
const digitDecimal = ".";

const operAdd = "+";
const operClear = "C";
const operDivide = "÷";
const operEqual = "=";
const operMultiply = "×";
const operNegate = "±";
const operSubtract = "-";
const operDefault = operAdd;

const displayError = "Error";
const displayDefault = digitZero;

interface Calculator {
  register: number; // value of left-side (stored)
  operator: string | null; // readied operation
  display: string; // value of right-side
  waiting: boolean; // user input expected (defaults will complete operations)
  executed: boolean; // last operation complete
  error: boolean; // last calculation Infinity or NaN
}

interface HandleInput {
  (key: string): void;
}

interface Button {
  id: string;
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
  {
    symbol: operClear,
    id: getId(operClear),
    onPressed: clear,
    class: buttonClassClear,
  },
  {
    symbol: operEqual,
    id: getId(operEqual),
    onPressed: equals,
    class: buttonClassEquals,
  },

  {
    symbol: digitSeven,
    id: getId(digitSeven),
    onPressed: enterDigit,
    class: buttonClassDigit,
  },
  {
    symbol: digitEight,
    id: getId(digitEight),
    onPressed: enterDigit,
    class: buttonClassDigit,
  },
  {
    symbol: digitNine,
    id: getId(digitNine),
    onPressed: enterDigit,
    class: buttonClassDigit,
  },
  {
    symbol: operDivide,
    id: getId(operDivide),
    onPressed: enterOper,
    class: buttonClassOper,
  },

  {
    symbol: digitFour,
    id: getId(digitFour),
    onPressed: enterDigit,
    class: buttonClassDigit,
  },
  {
    symbol: digitFive,
    id: getId(digitFive),
    onPressed: enterDigit,
    class: buttonClassDigit,
  },
  {
    symbol: digitSix,
    id: getId(digitSix),
    onPressed: enterDigit,
    class: buttonClassDigit,
  },
  {
    symbol: operMultiply,
    id: getId(operMultiply),
    onPressed: enterOper,
    class: buttonClassOper,
  },

  {
    symbol: digitOne,
    id: getId(digitOne),
    onPressed: enterDigit,
    class: buttonClassDigit,
  },
  {
    symbol: digitTwo,
    id: getId(digitTwo),
    onPressed: enterDigit,
    class: buttonClassDigit,
  },
  {
    symbol: digitThree,
    id: getId(digitThree),
    onPressed: enterDigit,
    class: buttonClassDigit,
  },
  {
    symbol: operSubtract,
    id: getId(operSubtract),
    onPressed: enterOper,
    class: buttonClassOper,
  },

  {
    symbol: operNegate,
    id: getId(operNegate),
    onPressed: negate,
    class: buttonClassDigit,
  },
  {
    symbol: digitZero,
    id: getId(digitZero),
    onPressed: enterDigit,
    class: buttonClassDigit,
  },
  {
    symbol: digitDecimal,
    id: getId(digitDecimal),
    onPressed: enterDecimal,
    class: buttonClassDigit,
  },
  {
    symbol: operAdd,
    id: getId(operAdd),
    onPressed: enterOper,
    class: buttonClassOper,
  },
];

function getId(symbol: string): string {
  return "calc-btn-" + getFriendly(symbol);
}

function getFriendly(symbol: string): string {
  if (operAdd === symbol) return "add";
  if (operClear === symbol) return "clear";
  if (operDivide === symbol) return "divide";
  if (operEqual === symbol) return "equal";
  if (operMultiply === symbol) return "multiply";
  if (operNegate === symbol) return "negate";
  if (operSubtract === symbol) return "subtract";
  if (digitDecimal === symbol) return "decimal";
  return symbol;
}

function calculate(
  operator: string,
  leftOpperand: number,
  rightOpperand: number
): string {
  let result: number;
  switch (operator) {
    case operMultiply:
      result = leftOpperand * rightOpperand;
      break;
    case operDivide:
      result = leftOpperand / rightOpperand;
      break;
    case operSubtract:
      result = leftOpperand - rightOpperand;
      break;
    default: // case operAdd:
      result = leftOpperand + rightOpperand;
  }
  state.error = Number.isNaN(result) || Infinity === result;

  return state.error ? displayError : parseFloat(result.toFixed(10)).toString();
}

function clear(): void {
  state.register = 0;
  state.operator = null;
  state.display = displayDefault;
  state.waiting = true;
  state.executed = true;
  state.error = false;
}

function clearError(): void {
  if (!state.error) return;
  state.display = displayDefault;
  state.error = false;
}

function negate(): void {
  !state.error || clearError();
  state.display = calculate(operMultiply, -1, parseFloat(state.display));
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

function enterDecimal(): void {
  if (/\./.test(state.display)) return;
  if (!state.waiting) {
    state.display += digitDecimal;
    return;
  }
  !state.error || clearError();
  state.display = displayDefault + digitDecimal;
  state.waiting = false;
}

function enterDigit(key: string): void {
  if (!state.waiting) {
    state.display =
      displayDefault === state.display ? key : state.display + key;
    return;
  }
  !state.error || clearError();
  state.display = key;
  state.waiting = false;
}

function enterOper(key: string): void {
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
    <div class="grid grid-cols-4 gap-1.5 font-bold">
      <CalculatorButton
        v-for="button in buttons"
        :key="button.id"
        :id="button.id"
        :value="button.symbol"
        :title="getFriendly(button.symbol)"
        :class="button.class"
        @pressed="button.onPressed"
      ></CalculatorButton>
    </div>
  </div>
</template>
