<script setup lang="ts">
defineProps({
  value: { type: String, required: true },
});
</script>

<template>
  <button
    class="rounded"
    :class="$attrs.class"
    @click="$emit('pressed', value)"
  >
    {{ value }}
  </button>
</template>
