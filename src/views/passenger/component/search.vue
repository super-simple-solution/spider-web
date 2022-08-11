<script lang="ts" setup>
import { defineEmits } from 'vue'
import useSearch from '@/hook/useSearch'
import { labelMap } from '../const'

import { useBaseStore } from '@/store/base'

const baseStore = useBaseStore()

const companyList = computed(() =>
  baseStore.companyList.map((item: { name: string; id: number }) => ({
    value: item.id,
    label: item.name,
  })),
)

const defaultForm = {
  company_id: null,
  name: '',
  id_card: '',
}
const emit = defineEmits(['op'])

const { toSearch, toEdit, state, updateForm } = useSearch({
  defaultForm,
  emit,
})

watch(
  companyList,
  (newV) => {
    if (newV && newV.length && !state.form.company_id) {
      updateForm({
        company_id: newV[0].value,
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex">
    <el-form label-width="80px" inline>
      <el-form-item>
        <el-select-v2
          v-model="state.form.company_id"
          :options="companyList"
          :placeholder="`选择${labelMap.company_name}`"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-input v-model="state.form.name" :placeholder="`${labelMap.name}`" clearable> </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="state.form.id_card" :placeholder="`${labelMap.id_card}`" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="toSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="toEdit({})">新增</el-button>
  </div>
</template>
