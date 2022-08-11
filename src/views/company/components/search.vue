<script lang="ts" setup>
import { defineEmits } from 'vue'
import useSearch from '@/hook/useSearch'
const emit = defineEmits(['op'])

const { toSearch, toEdit, state } = useSearch({
  defaultForm: {
    name: '',
  },
  emit,
})
</script>

<template>
  <div class="flex">
    <el-form inline>
      <el-form-item label="企业名称">
        <el-input v-model="state.form.name" placeholder="搜索" clearable class="w-300" />
      </el-form-item>
      <el-form-item>
        <el-button @click="toSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="toEdit({})">新增</el-button>
  </div>
</template>
