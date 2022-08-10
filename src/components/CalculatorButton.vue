<script setup lang="ts">
const props = defineProps({
  value: { type: String, required: true },
  class: String,
});
</script>

<template>
  <button :class="props.class" @click="$emit('pressed', value)">
    {{ value }}
  </button>
</template>
