/// <reference types="vite/client" />
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  
  declare module '*.ts'
  
  declare let XE: any
  declare let Cesium: any
  declare let turf: any
  declare let Sync: any
  
  declare module 'sdk/XbsjEarth-Plugins/getExtremum'
  declare module 'sdk/XbsjEarth-Plugins/measure'
  declare module 'turf'
  