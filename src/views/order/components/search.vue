<script lang="ts" setup>
import { defineEmits } from 'vue'
import useSearch from '@/hook/useSearch'
import { OrderStateList } from '@/api/share'
import { DataOptions } from '@/types/local'
import { useBaseStore } from '@/store/base'
const emit = defineEmits(['op'])

const baseStore = useBaseStore()

const companyList = computed(() =>
  baseStore.companyList.map((item: { name: string; id: number }) => ({
    value: item.id,
    label: item.name,
  })),
)

const defaultForm: DataOptions = {
  order_state: null,
  company_id: null,
}

const orderStateList = [{ value: 0, label: '全部' }].concat(OrderStateList)

const { toSearch, state } = useSearch({
  defaultForm,
  emit,
})
</script>

<template>
  <el-form inline>
    <el-form-item>
      <el-select-v2 v-model="state.form.order_state" :options="orderStateList" placeholder="请输入订单状态" clearable />
    </el-form-item>
    <el-form-item>
      <el-select-v2 v-model="state.form.company_id" :options="companyList" placeholder="请输入来源企业" clearable />
    </el-form-item>
    <el-form-item>
      <el-button @click="toSearch">查询</el-button>
    </el-form-item>
  </el-form>
</template>
