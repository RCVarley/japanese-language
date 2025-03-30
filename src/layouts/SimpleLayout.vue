<script setup lang="ts">
defineSlots<{
  default(): any
}>()
</script>

<template>
  <div class="page simple-layout">
    <main v-bind="$attrs"><slot>main</slot></main>
  </div>
</template>

<style>
main {
  place-content: center;
  place-items: center;
}
</style>