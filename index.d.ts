declare module 'laogao-test-ui' {
  import { App } from 'vue'
  const LGUI: {
    install(app: App): void
  }
  export default LGUI
}

declare let XE: any
