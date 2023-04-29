<script setup lang="ts">
defineProps({
  value: { type: String, required: true },
  id: { type: String, required: true },
});

defineEmits(["pressed"]);
</script>

<template>
  <button :id="id" class="rounded-sm" @click="$emit('pressed', value)">
    {{ value }}
  </button>
</template>
