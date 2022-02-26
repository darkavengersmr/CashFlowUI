import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginForm.vue'
import RegView from '../components/RegForm.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
