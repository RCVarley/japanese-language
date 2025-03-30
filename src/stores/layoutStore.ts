import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layouts', () => {
  const drawerOpen = ref(true)
  return {
    drawerOpen,
  }
})
