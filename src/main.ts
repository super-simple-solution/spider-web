import App from './App.vue'
import { createApp } from 'vue'
// import { router } from '@/router/index'
import '@/style/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)

const beforeEnterApp = () => {}

beforeEnterApp().finally(() => {
  // app.use(router)
  app.mount('#app')
})