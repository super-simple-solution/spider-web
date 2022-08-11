import App from './App.vue'
import { router } from '@/router/index'
import '@/styles/index.scss'
import performLoader from './utils/global_main_loader.js'
import { createPinia } from 'pinia'
import { useUserStore } from '@/store/user'
import { useBaseStore } from '@/store/base'
import { noNeedLogin } from '@/utils'
import { getToken, toLogin, setToken } from '@/utils/auth'
import ElementPlus, { ElLoading } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
const userStore = useUserStore()
const baseStore = useBaseStore()
performLoader(app)

const loading = ElLoading.service({ fullscreen: true, text: '拼命加载中' })

const beforeEnterApp = () => {
  if (noNeedLogin()) {
    return Promise.resolve()
  }
  // set token to cookie   // 从工蚁跳转拿token
  const matchToken = location.href.match(/[?&]token=([^&?=/#]+)/)
  let token = getToken()
  if (token) {
    userStore.$patch({
      token,
    })
  } else if (matchToken) {
    token = matchToken[1]
    setToken(token)
    userStore.$patch({
      token,
    })
  } else {
    toLogin()
  }
  const tasks = [baseStore.getBase(), userStore.getUserInfo()]
  return Promise.all(tasks)
}

beforeEnterApp().finally(() => {
  loading.close()
  app.use(router)
  app.mount('#app')
})
