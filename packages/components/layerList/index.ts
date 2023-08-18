import { type App } from 'vue'
import LayerList from './src/index.vue'

// 定义 install 方法， App 作为参数
LayerList.install = (app: App): void => {
    app.component(LayerList.name, LayerList)
}

export default LayerList
