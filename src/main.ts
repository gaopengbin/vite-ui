import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import LgUi from '../packages/index'

XE.ready().then(() => {
  console.log('XE.ready()')
  createApp(App).use(LgUi).mount('#app')
})
