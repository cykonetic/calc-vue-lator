<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  value: { type: String, required: true },
});

const display = computed(() => {
  return props.value + (/\./.test(props.value) ? "" : ".");
});
</script>

<template>
  <div class="w-fit pb-2">
    <input
      type="text"
      disabled
      :value="display"
      class="w-full text-right text-black px-1"
    />
  </div>
</template>
