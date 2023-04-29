<script setup lang="ts">
const props = defineProps({
  value: { type: String, required: true },
});
</script>

<template>
  <div class="w-fit pb-2">
    <input
      type="text"
      id="calc-display"
      disabled
      :value="props.value"
      class="w-full text-right text-black px-1"
      style="border: 2px inset indigo"
    />
  </div>
</template>
