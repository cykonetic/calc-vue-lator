<script setup lang="ts">
const props = defineProps({
  value: { type: String, required: true },
});
</script>

<template>
  <input
    type="text"
    id="calc-display"
    title="display"
    disabled
    :value="props.value"
    class="w-full text-right text-black bg-gray-400 disabled:bg-gray-400 px-1"
  />
</template>
