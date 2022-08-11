<script setup lang="ts">
import { tableConfig } from './const'
import Search from './component/search.vue'
import Edit from './component/edit.vue'
import { listPassenger, updatePassenger } from '@/api/passenger'
import useList from '@/hook/useList'
import { listProcess } from './util'
import { useBaseStore } from '@/store/base'

const baseStore = useBaseStore()

const processOptions = computed(() => ({
  companyMap: baseStore.companyMap,
  employeeMap: baseStore.employeeMap,
}))

const { state, pagination, op, reset } = useList({
  tableConfig,
  listProcess,
  processOptions,
  api: {
    list: listPassenger,
    delete: updatePassenger,
  },
  listKey: 'passenger_list',
  deleteKey: 'passenger',
  deleteType: 'update',
  deleteOption: {
    active: false,
  },
  searchOption: {},
})
</script>

<template>
  <div>
    <Search @op="op"></Search>
    <List :table="state.table" :page="state.page" class="mt-4" @op="op" @pagination="pagination"></List>

    <Edit :flag="state.flag" :row-info="state.rowInfo" @reset="reset"></Edit>
  </div>
</template>
