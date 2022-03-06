import { createRouter, createWebHistory } from 'vue-router'
import LoginFormView from '../views/LoginFormView.vue'
import RegFormView from '../views/RegFormView.vue'
import InflowFormView from '../views/InflowFormView.vue'
import OutflowFormView from '../views/OutflowFormView.vue'

import TestForm from '../components/TestForm.vue'

const routes = [
  {
    path: '/',
    name: 'test',
    component: TestForm
  },
  {
    path: '/login',
    name: 'login',
    component: LoginFormView
  },
  {
    path: '/register',
    name: 'register',
    component: RegFormView
  },
  {
    path: '/inflow',
    name: 'inflow',
    component: InflowFormView
  },
  {
    path: '/outflow',
    name: 'outflow',
    component: OutflowFormView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
