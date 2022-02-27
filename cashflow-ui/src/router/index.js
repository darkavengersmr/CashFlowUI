import { createRouter, createWebHistory } from 'vue-router'
import LoginFormView from '../views/LoginFormView.vue'
import RegFormView from '../views/RegFormView.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginFormView
  },
  {
    path: '/register',
    name: 'register',
    component: RegFormView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
