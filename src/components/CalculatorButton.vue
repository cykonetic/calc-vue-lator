<script setup lang="ts">
defineProps({
  value: { type: String, required: true },
});

defineEmits(["pressed"]);
</script>

<template>
  <button class="rounded" @click="$emit('pressed', value)">
    {{ value }}
  </button>
</template>
