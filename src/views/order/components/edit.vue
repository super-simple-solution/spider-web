<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { labelMap, rules, DayTypeTextMap, DayType } from '../const'
import { OrderTypeText, OrderState } from '@/api/share'
import useEdit from '@/hook/useEdit'
import { formInit, formParse } from '../util'
import { updateOrder } from '@/api/order'
import { ElMessage, FormInstance } from 'element-plus'
import { useBaseStore } from '@/store/base'
import { Delete } from '@element-plus/icons-vue'
import { loadFile } from '@/utils'
import { mapProps } from '@/utils/map'
import { flagType } from '@/const/index'

const { center } = mapProps
const imgUrl = loadFile('station-icon.png')

const location = reactive({
  lng: center.lng,
  lat: center.lat,
})

const pointsLoc = ref([])

const mapConfig = {
  locationControl: true,
  cityListControl: true,
  contextMenu: true,
  markerIcon: imgUrl,
  markerList: pointsLoc,
  polyline: {
    points: pointsLoc,
  },
}

const baseStore = useBaseStore()

const emit = defineEmits(['op', 'reset'])

const form = ref<FormInstance>()

const props = defineProps({
  flag: {
    type: Number,
    default: 0,
  },
  rowInfo: {
    type: Object,
    default: () => ({}),
  },
})

const visible = computed((): boolean => {
  return !!props.flag
})

const { state, confirm, cancel, editText } = useEdit({
  defaultText: '订单',
  formInit,
  formParse,
  rules,
  emit,
  apiMap: {
    2: updateOrder,
  },
  entityKey: 'order',
  props,
})
const { rules: rulesTyped } = state

const deleteRow = (index: number) => state.form.plan_trip_list.splice(index, 1)
const onAddItem = () => {
  state.form.plan_trip_list.push({
    line_id: null,
    plan_depart_time: null,
  })
}

let lineList = ref([] as any)
const remoteMethod = (query: string) => {
  if (query) {
    lineList.value = baseStore.lineList.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase())
    })
  } else {
    lineList.value = []
  }
}

const toPass = (form: any) => {
  state.form.order_state = OrderState.OS_PASSING
  confirm(form)
}
const toReject = (form: any) => {
  state.form.order_state = OrderState.OS_REJECTION
  confirm(form)
}

const seeMap = ref(false)
const toSeeMap = (row: { line_id: number }) => {
  seeMap.value = false
  const currentLine = baseStore.lineList.find((item) => item.id === row.line_id)
  if (!currentLine) {
    ElMessage('未匹配到数据')
    return
  }
  const stationIdList = currentLine.station_id_list
  if (!stationIdList.length) {
    ElMessage('未匹配到数据')
    return
  }
  pointsLoc.value = stationIdList.map((item: string | number) => {
    const curStationInfo = baseStore.stationMap[item]
    return {
      lat: curStationInfo.location.latitude,
      lng: curStationInfo.location.longitude,
    }
  })
  seeMap.value = true
}
</script>

<template>
  <el-dialog :model-value="visible" :title="editText" width="700px" @close="cancel(form)">
    <el-form ref="form" :model="state.form" :rules="rulesTyped" label-width="auto">
      <el-form-item :label="labelMap.order_num">
        {{ state.form.order_num }}
      </el-form-item>
      <el-form-item :label="labelMap.name">
        {{ state.form.name }}
      </el-form-item>
      <el-form-item :label="labelMap.company_id_text">
        {{ state.form.company_id_text }}
      </el-form-item>
      <el-form-item :label="labelMap.created_time_text">
        {{ state.form.created_time_text }}
      </el-form-item>
      <el-form-item :label="labelMap.order_type" prop="order_type">
        <el-select v-model="state.form.order_type" :placeholder="`请选择${labelMap.order_type}`">
          <el-option v-for="(val, key) in OrderTypeText" :key="key" :label="val" :value="+key" />
        </el-select>
      </el-form-item>
      <el-form-item :label="labelMap.bus_num" prop="bus_num">
        <el-input v-model="state.form.bus_num" :placeholder="`请输入${labelMap.bus_num}`" />
      </el-form-item>
      <div class="flex">
        <el-form-item label="开始日期">
          <el-date-picker v-model="state.form.time_range.from" type="date" placeholder="请输入开始日期" />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker v-model="state.form.time_range.to" type="date" placeholder="请输入结束日期" />
        </el-form-item>
      </div>
      <el-form-item :label="labelMap.day_type" prop="day_type">
        <el-radio-group v-model="state.form.day_type">
          <el-radio :label="DayType.DT_EVERYDAY">{{ DayTypeTextMap[DayType.DT_EVERYDAY] }}</el-radio>
          <el-radio :label="DayType.DT_WORKDAY">{{ DayTypeTextMap[DayType.DT_WORKDAY] }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-table :data="state.form.plan_trip_list" style="width: 100%" border max-height="250">
          <el-table-column label="发车时间">
            <template #default="scope">
              <el-time-picker v-model="scope.row.plan_depart_time" style="width: 80%" format="HH:mm" />
            </template>
          </el-table-column>
          <el-table-column label="线路">
            <template #default="scope">
              <div class="flex items-center">
                <el-select
                  v-model="scope.row.line_id"
                  remote
                  filterable
                  :remote-method="remoteMethod"
                  class="m-2"
                  placeholder="请选择线路"
                >
                  <el-option v-for="line in lineList" :key="line.id" :label="line.name" :value="line.id" />
                </el-select>
                <el-button type="text" @click="toSeeMap(scope.row)">查看</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button type="danger" :icon="Delete" circle @click.prevent="deleteRow(scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
        <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加车次</el-button>
      </el-form-item>
      <el-form-item :label="labelMap.comments" prop="comments">
        <el-input v-model="state.form.comments" type="area" :placeholder="`请输入${labelMap.comments}`" />
      </el-form-item>
      <div v-if="seeMap" style="height: 300px; margin-bottom: 20px">
        <bmap :config="mapConfig"></bmap>
      </div>
      <el-form-item v-if="props.flag !== flagType.detail">
        <el-button v-if="state.form.order_state === OrderState.OS_PASSING" type="danger" @click="toReject(form)">
          驳回
        </el-button>
        <el-button v-else-if="state.form.order_state === OrderState.OS_REJECTION" @click="toPass(form)">通过</el-button>
        <template v-else>
          <el-button type="danger" @click="toReject(form)"> 驳回 </el-button>
          <el-button @click="toPass(form)">通过</el-button>
        </template>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
