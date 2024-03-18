<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(false)

defineEmits(['handleExpanded'])
</script>

<template>
  <div @click="$emit('handleExpanded')" class="chevron-wrapper">
    <span :class="`chevron-down ${expanded ? 'expanded' : ''}`" />
  </div>
</template>

<style>
.chevron-wrapper {
  display: flex;
  width: 20px;
  height: 20px;
  align-items: end;
  cursor: pointer;
}

.chevron-down {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 10px;
}

.chevron-down::before,
.chevron-down::after {
  content: '';
  position: absolute;
  top: 0;
  width: 10px;
  height: 2px;
  background-color: var(--color-text);
}

.chevron-down::before {
  left: 0;
  transform: skewY(45deg);
}

.chevron-down::after {
  right: 0;
  transform: skewY(-45deg);
}

.chevron-down.expanded::before {
  left: 0;
  transform: skewY(-45deg);
}

.chevron-down.expanded::after {
  right: 0;
  transform: skewY(45deg);
}
</style>
