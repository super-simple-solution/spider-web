<script lang="ts" setup>
import { defineEmits } from 'vue'
import { DataOptions } from '@/types/local'
import useSearch from '@/hook/useSearch'

const defaultForm: DataOptions = {
  date: new Date().getTime(),
  order_name: '',
  order_num: '',
}

const emit = defineEmits(['op'])

const { toSearch, state } = useSearch({
  defaultForm,
  emit,
})
</script>

<template>
  <el-form inline="true">
    <el-form-item>
      <el-input v-model="state.form.order_name" placeholder="请输入任务名称" clearable> </el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="state.form.order_num" placeholder="请输入订单号" clearable> </el-input>
    </el-form-item>
    <el-form-item>
      <el-date-picker v-model="state.form.date" type="date" />
    </el-form-item>
    <el-form-item>
      <el-button @click="toSearch">查询</el-button>
    </el-form-item>
  </el-form>
</template>
