<script setup lang="ts">
import SimpleLayout from '@/layouts/SimpleLayout.vue'
import TextField from '@/components/fields/TextField.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore.ts'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const userStore = useUserStore()
const router = useRouter()
function onLogin() {
  try {
    userStore.login(email.value, password.value)
    router.replace({ name: 'home' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <SimpleLayout>
    <TextField
      v-model="email"
      id="email"
      label="Email"
      class="col-span-2"
    />
    <TextField
      v-model="password"
      id="password"
      label="Password"
      type="password"
      class="col-span-2"
    />
    <button
      class="self-end"
      :disabled="!email || !password"
      @click="onLogin"
    >
      Login
    </button>
  </SimpleLayout>
</template>

<style scoped>
</style>
