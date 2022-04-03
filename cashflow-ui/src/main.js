import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store/store'
import router from './router'
import "./theme.css"

import { vfmPlugin } from 'vue-final-modal'

createApp(App).use(store).use(router).use(vfmPlugin).mount('#app')
