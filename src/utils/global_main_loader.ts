import 'virtual:svg-icons-register'
import Adaptive from '@/directive/el-table/adaptive'
import BaiduMapVue3 from 'baidu-map-vue3'
import { baiduAK } from '@/const'
import { App } from 'vue'

export default function performLoader(app: App<Element>) {
  // thirdparty component
  app.directive('adaptive', Adaptive)
  app.use(BaiduMapVue3, {
    apiKey: baiduAK,
  })
  // mixin
  app.mixin({
    methods: {
      tableRowClassName({ rowIndex }: { rowIndex: number }) {
        if (rowIndex % 2 == 0) {
          return 'even'
        } else {
          return 'odd'
        }
      },
    },
  })
}
