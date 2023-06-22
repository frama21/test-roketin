<template>
  <VDialog :model-value="show" persistent :max-width="width" v-bind="$attrs">
    <VCard class="rounded-xl">
      <slot />
    </VCard>
  </VDialog>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [String, Number],
    default: 400,
  },
});
</script>
