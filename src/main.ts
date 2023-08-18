import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import LgUi from '../packages/index'

XE.ready().then(() => {
  console.log('XE.ready()')
  createApp(App).use(ElementPlus).use(LgUi).mount('#app')
})
