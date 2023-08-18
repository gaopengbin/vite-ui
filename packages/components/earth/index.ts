import { type App } from 'vue'
import Earth from './src/index.vue'

Earth.install = (app: App): void => {
  app.component(Earth.name, Earth)
}

export default Earth
