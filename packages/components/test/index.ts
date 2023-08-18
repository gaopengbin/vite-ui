import { type App } from 'vue'
import Test from './src/index.vue'

Test.install = (app: App): void => {
  app.component(Test.name, Test)
}

export default Test
