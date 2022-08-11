<script setup lang="ts">
import { tableConfig } from './const'
import Search from './component/search.vue'
import { listPlanTrip, updatePlanTrip } from '@/api/plan_trip'
import useList from '@/hook/useList'
import { listProcess } from './util'
import { useBaseStore } from '@/store/base'

const baseStore = useBaseStore()
const processOptions = computed(() => ({
  employeeMap: baseStore.employeeMap,
  busMap: baseStore.busMap,
  stationMap: baseStore.stationMap,
}))

const { state, pagination, op, init } = useList({
  tableConfig,
  listProcess,
  processOptions,
  api: {
    list: listPlanTrip,
  },
  listKey: 'plan_trip_list',
  searchOption: {},
})

const celldbClick = (row: { is_edit_bus: boolean; is_edit_driver: boolean }, column: { property: string }) => {
  if (column.property === 'bus_id_text') {
    row.is_edit_bus = true
  }

  if (column.property === 'driver_id_text') {
    row.is_edit_driver = true
  }
}
const updateDriver = (row: any) => {
  toUpdate(row, {
    id: row.id,
    driver_id: row.driver_id,
  })
}
const updateBus = (row: any) => {
  toUpdate(row, {
    id: row.id,
    bus_id: row.bus_id,
  })
}

const toUpdate = (row: any, params: { id: number; driver_id?: number; bus_id?: number }) => {
  updatePlanTrip({
    plan_trip: params,
  }).then(() => {
    row.is_edit_bus = false
    row.is_edit_driver = false
    init()
  })
}

let employeeList = ref([] as any)
let busList = ref([] as any)
const remoteMethod = (query: string) => {
  if (query) {
    employeeList.value = baseStore.employeeList.filter((item) => item.name.indexOf(query) > -1)
    busList.value = baseStore.busList.filter((item) => item.license_number.indexOf(query) > -1)
  } else {
    employeeList.value = []
    busList.value = []
  }
}
</script>

<template>
  <div>
    <Search @op="op"></Search>

    <el-table :data="state.table.data" border style="width: 100%" @cell-dblclick="celldbClick">
      <el-table-column prop="exec_date_text" label="日期" />
      <el-table-column prop="begin_station_id_text" label="发车点" />
      <el-table-column prop="plan_depart_time_text" label="发车时间" />
      <el-table-column prop="end_station_id_text" label="终点" />
      <el-table-column prop="bus_id_text" label="车牌号">
        <template #default="scope">
          <span v-if="!scope.row.is_edit_bus">{{ scope.row.bus_id_text }}</span>
          <span v-else>
            <el-select
              v-model="scope.row.bus_id"
              remote
              :remote-method="remoteMethod"
              class="m-2"
              filterable
              @change="updateBus(scope.row)"
            >
              <el-option v-for="item in busList" :key="item.id" :label="item.license_number" :value="item.id" />
            </el-select>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="driver_id_text" label="司机">
        <template #default="scope">
          <span v-if="!scope.row.is_edit_driver">{{ scope.row.driver_id_text }}</span>
          <span v-else>
            <el-select
              v-model="scope.row.is_edit_driver"
              remote
              :remote-method="remoteMethod"
              class="m-2"
              filterable
              @change="updateDriver(scope.row)"
            >
              <el-option v-for="item in employeeList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="state.page.total > 0"
      :total="state.page.total"
      layout="prev, pager, next"
      :page="state.page.params.pageNum"
      :limit="state.page.params.pageSize"
      background
      @pagination="pagination"
    />
  </div>
</template>
