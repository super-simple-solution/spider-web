<script setup lang="ts">
import { tableConfig } from './const'
import Search from './components/search.vue'
import { listCompany, deleteCompany } from '@/api/company'
import useList from '@/hook/useList'
import Edit from './components/edit.vue'
import { useBaseStore } from '@/store/base'
import { listProcess } from './util'

const baseStore = useBaseStore()

const processOptions = computed(() => ({
  employeeMap: baseStore.employeeMap,
}))

const { state, pagination, op, reset } = useList({
  tableConfig,
  listProcess,
  processOptions,
  api: {
    list: listCompany,
    delete: deleteCompany,
  },
  listKey: 'company_list',
  deleteKey: 'company_id',
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
