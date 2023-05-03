<script setup lang="ts">
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  value: { type: String, required: true },
});

defineEmits(["pressed"]);
</script>

<template>
  <button
    :id="id"
    :title="title"
    class="rounded-sm"
    @click="$emit('pressed', value)"
  >
    {{ value }}
  </button>
</template>
