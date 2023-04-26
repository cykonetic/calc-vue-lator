<script setup lang="ts">
defineProps({
  value: { type: String, required: true },
});

defineEmits(["pressed"]);
</script>

<template>
  <button class="rounded-md" @click="$emit('pressed', value)">
    {{ value }}
  </button>
</template>
