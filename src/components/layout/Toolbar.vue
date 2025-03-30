<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.ts'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { user, isLoggedIn } = storeToRefs(userStore)
function handleLogout() {
  userStore.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="toolbar p px-4">
    <span class="title">{{ route.meta.title }}</span>
    <span v-if="isLoggedIn">{{ user.email }}</span>
    <button v-if="isLoggedIn" @click="handleLogout">Logout</button>
    <button v-else @click="router.push({ name: 'login' })">Login</button>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--size-2);

  .title {
    font-size: 2em;
  }
}
</style>
