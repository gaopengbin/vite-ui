import { type App } from 'vue'
import components from './components'
// 所有组件
export * from './components'

export * from './utils'

// 完整引入组件
const install = function (app: App) {
  components.forEach((component: unknown) => {
    app.use(component as unknown as { install: () => any })
  })
}

export default {
  install
}
