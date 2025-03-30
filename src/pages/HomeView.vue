<script setup lang="ts">
import StandardLayout from '@/layouts/StandardLayout.vue'
</script>

<template>
  <StandardLayout>
    <div class="home">
      <h1>Dashboard</h1>
    </div>
  </StandardLayout>
</template>

<style scoped>
.home {
  display: grid;
  text-align: center;
  height: 100%;
  place-items: center;
}
</style>
