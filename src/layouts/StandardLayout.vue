<script setup lang="ts">
import Toolbar from '@/components/layout/Toolbar.vue'
import NavDrawer from '@/components/layout/NavDrawer.vue'
import { useLayoutStore } from '@/stores/layoutStore.ts'
import { storeToRefs } from 'pinia'

defineSlots<{
  default(): any
}>()

const layoutStore = useLayoutStore()
const { drawerOpen } = storeToRefs(layoutStore)
</script>

<template>
  <div
    class="page standard-layout"
    :class="
      {
        'standard-layout--drawer-mini': !drawerOpen,
      }
    "
  >
    <header><Toolbar /></header>
    <NavDrawer v-model="drawerOpen" />
    <main><slot>main</slot></main>
    <footer>footer</footer>
  </div>
</template>

<style>
.standard-layout {
  --drawer-width: minmax(15rem, max-content);
  grid-template-columns: var(--drawer-width) 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header'
    'nav main'
    'nav footer';

  > header {
    grid-area: header;
  }

  > footer {
    grid-area: footer;
  }

  > nav {
    grid-area: nav;
    overflow-y: auto;
  }

  > main {
    padding: var(--size-4);
    overflow-y: auto;
  }

  &.standard-layout--drawer-mini {
    --drawer-width: max-content;
  }
}
</style>
