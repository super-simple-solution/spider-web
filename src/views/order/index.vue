<script setup lang="ts">
import { tableConfig } from './const'
import Search from './components/search.vue'
import { listOrder, deleteOrder } from '@/api/order'
import useList from '@/hook/useList'
import Edit from './components/edit.vue'
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
    list: listOrder,
    delete: deleteOrder,
  },
  listKey: 'order_list',
  deleteKey: 'order_id',
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
