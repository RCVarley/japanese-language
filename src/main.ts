import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import '@/assets/style/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
