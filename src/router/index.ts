import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomeView.vue'
import Login from '@/pages/LoginView.vue'
import Register from '@/pages/RegisterView.vue'
import TextIndexPage from '@/pages/texts/index.vue'
import TextListPage from '@/pages/texts/TextListView.vue'
import TextViewPage from '@/pages/texts/TextView.vue'

export const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: { title: 'Home' },
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: { title: 'Login', hidden: true },
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: { title: 'Register', hidden: true },
  },
  {
    path: '/texts',
    component: TextIndexPage,
    meta: { title: 'Texts' },
    children: [
      {
        name: 'texts',
        path: '',
        component: TextListPage,
      },
      {
        name: 'texts-id',
        path: ':id',
        component: TextViewPage,
        props: true,
      },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})