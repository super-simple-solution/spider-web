<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { labelMap, rules } from '../const'
import useEdit from '@/hook/useEdit'
import { formInit } from '../util'
import { createPassenger, updatePassenger } from '@/api/passenger'
import type { FormInstance } from 'element-plus'
import { useBaseStore } from '@/store/base'
import { mapProps } from '@/utils/map'

const { center } = mapProps

const baseStore = useBaseStore()

const companyList = computed(() =>
  baseStore.companyList.map((item: { name: string; id: number }) => ({
    value: item.id,
    label: item.name,
  })),
)

const emit = defineEmits(['op', 'reset'])

const form = ref<FormInstance>()
const location = reactive(center)

const mapConfig = {
  locationControl: true,
  cityListControl: true,
  contextMenu: true,
  markerList: [location],
}

type Geocoder = {
  getPoint: (arg0: any, arg1: (arg0: any) => void) => void
}

let geocoder: Geocoder

function mapReady() {
  if (window.BMap) {
    geocoder = new window.BMap.Geocoder() as Geocoder
  }
}

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

const { state, editText, confirm, cancel, updateForm } = useEdit({
  defaultText: '乘车人员',
  formInit,
  rules,
  emit,
  apiMap: {
    1: createPassenger,
    2: updatePassenger,
  },
  entityKey: 'passenger',
  props,
})

watch(
  visible,
  (newV) => {
    if (newV && companyList.value.length && !state.form.company_id) {
      updateForm({
        company_id: companyList.value[0].value,
      })
    }
  },
  { immediate: true },
)

watch(
  () => state.form.address,
  (newV) => {
    if (!newV || !geocoder) return
    // TODO: 使用用户选择的城市
    geocoder.getPoint(`连云港市${newV}`, (point) => {
      if (point) {
        location.lng = point.lng
        location.lat = point.lat
        updateForm({
          location,
        })
      }
    })
  },
)

const { rules: rulesTyped } = state
</script>

<template>
  <el-dialog :model-value="visible" :title="editText" width="700px" @close="cancel(form)">
    <el-form ref="form" :model="state.form" :rules="rulesTyped" label-width="auto">
      <el-form-item :label="labelMap.name" prop="name">
        <el-input v-model="state.form.name" :placeholder="`请输入${labelMap.name}`" />
      </el-form-item>
      <el-form-item :label="labelMap.company_id" prop="company_id">
        <el-select-v2
          v-model="state.form.company_id"
          :options="companyList"
          :placeholder="`选择${labelMap.company_id}`"
          clearable
        />
      </el-form-item>
      <el-form-item :label="labelMap.telephone" prop="telephone">
        <el-input v-model="state.form.telephone" :placeholder="`请输入${labelMap.telephone}`" />
      </el-form-item>
      <el-form-item :label="labelMap.id_card" prop="id_card">
        <el-input v-model="state.form.id_card" :placeholder="`请输入${labelMap.id_card}`" />
      </el-form-item>
      <el-form-item :label="labelMap.address" prop="address">
        <el-input v-model="state.form.address" :placeholder="`请输入${labelMap.address}`" />
      </el-form-item>
      <div style="height: 400px; margin-bottom: 20px">
        <bmap :config="mapConfig" :center="location" @ready="mapReady"></bmap>
      </div>
      <el-form-item>
        <el-button type="primary" @click="confirm(form)">立即创建</el-button>
        <el-button @click="cancel(form)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
