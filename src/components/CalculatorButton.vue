<script setup lang="ts">
defineProps({
  value: { type: String, required: true },
});

defineEmits(["pressed"]);
</script>

<template>
  <button class="rounded-sm" @click="$emit('pressed', value)">
    {{ value }}
  </button>
</template>
