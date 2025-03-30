<script setup lang="ts">
import { ref } from 'vue'
import SimpleLayout from '@/layouts/SimpleLayout.vue'
import TextField from '@/components/fields/TextField.vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <SimpleLayout class="register">
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
    <button class="self-end">Sign up</button>
  </SimpleLayout>
</template>

<style>
.register {
  grid-template-columns: 1fr 1fr;
}
</style>