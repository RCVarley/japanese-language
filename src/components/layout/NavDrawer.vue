<script setup lang="ts">
import { routes as _routes } from '@/router'
import { computed } from 'vue'

const isOpen = defineModel<boolean>()

const routes = computed(() => _routes.filter((route) => !route.meta.hidden))
</script>

<template>
  <nav class="nav-drawer" :class="{ 'nav-drawer--open': isOpen }">
    <ul class="m-0 px-0 h-full flex-column">
      <li v-for="route in routes" :key="route.name" class="p">
        <RouterLink :to="route">{{ route.meta.title }}</RouterLink>
      </li>
      <li class="mt-auto">
        <button @click="isOpen = !isOpen">
          <span v-if="isOpen"><-</span>
          <span v-else>-></span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style>
.nav-drawer {
  ul {
    list-style-type: none;

    li {
      button {
        width: 100%;
        border-radius: 0;
        text-align: right;
      }
    }
  }
}
</style>