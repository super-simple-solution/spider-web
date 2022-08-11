<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { labelMap, rules, Type } from '../const'
import useEdit from '@/hook/useEdit'
import { formInit } from '../util'
import { createCompany, updateCompany } from '@/api/company'
import type { FormInstance } from 'element-plus'

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

const { state, confirm, cancel, deleteImage, afterUpload, editText } = useEdit({
  defaultText: '企业',
  formInit,
  rules,
  emit,
  apiMap: {
    1: createCompany,
    2: updateCompany,
  },
  entityKey: 'company',
  props,
  image_url: 'pic_url',
})
const { rules: rulesTyped } = state
</script>

<template>
  <el-dialog :model-value="visible" :title="editText" width="700px" @close="cancel(form)">
    <el-form ref="form" :model="state.form" :rules="rulesTyped" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item :label="labelMap.name" prop="name">
            <el-input v-model="state.form.name" :placeholder="`请输入${labelMap.name}`" />
          </el-form-item>
          <el-form-item :label="labelMap.organization_code" prop="organization_code">
            <el-input v-model="state.form.organization_code" :placeholder="`请输入${labelMap.organization_code}`" />
          </el-form-item>
          <el-form-item :label="labelMap.contact" prop="contact">
            <el-input v-model="state.form.contact" :placeholder="`请输入${labelMap.contact}`" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item :label="labelMap.short_name" prop="short_name">
            <el-input v-model="state.form.short_name" :placeholder="`请输入${labelMap.short_name}`" />
          </el-form-item>
          <el-form-item :label="labelMap.type" prop="type">
            <el-select v-model="state.form.type" :placeholder="`请选择${labelMap.type}`">
              <el-option v-for="(val, key) in Type" :key="key" :label="val" :value="+key" />
            </el-select>
          </el-form-item>
          <el-form-item :label="labelMap.telephone" prop="telephone">
            <el-input v-model="state.form.telephone" :placeholder="`请输入${labelMap.telephone}`" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="labelMap.address" prop="address">
        <el-input v-model="state.form.address" :placeholder="`请输入${labelMap.address}`" />
      </el-form-item>
      <el-form-item :label="labelMap.pic_url" prop="address">
        <upload-image
          size
          :upload-button-text="state.form.pic_url ? '重新上传' : '点击上传'"
          :urls="state.form.pic_url ? [state.form.pic_url] : []"
          @delete="deleteImage"
          @upload="afterUpload"
        ></upload-image>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm(form)">立即创建</el-button>
        <el-button @click="cancel(form)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
