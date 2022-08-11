<template>
  <div :style="helper ? 'min-width: 360px' : 'min-width: 100px'">
    <el-upload
      v-if="disabled === false"
      action="/api/image/upload"
      :show-file-list="false"
      :http-request="upload"
      :multiple="multiple"
      style="display: inline-block"
    >
      <el-button type="primary" :size="size" :loading="uploading">{{ uploadButtonText }}</el-button>
    </el-upload>
    <slot></slot>
    <upload-helper
      v-if="helper"
      :disabled="disabled"
      :no-image-tip="disabled === false ? '' : noImageTip"
      :urls="urls"
      @delete="deleteImage"
    >
      <template #default="index">
        <slot name="legend" v-bind="index"></slot>
      </template>
    </upload-helper>
  </div>
</template>

<script setup lang="ts">
import { ImageUpload } from '@/api/upload'
import { PropType, defineProps, defineEmits } from 'vue'
type SizeType = '' | 'small' | 'large' | 'medium' | 'mini'

defineProps({
  size: {
    type: String as PropType<SizeType>,
    default: () => 'normal',
  },
  urls: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  uploadButtonText: {
    type: String,
    default: '点击上传',
  },
  noImageTip: {
    type: String,
    default: '暂无图片',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  helper: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})
const uploading = ref(false)

const emit = defineEmits(['delete', 'upload'])

const deleteImage = (url: string, index: number) => emit('delete', url, index)
const upload = (data: any): unknown => {
  uploading.value = true
  return ImageUpload(data.file)
    .then((res: string) => {
      emit('upload', res)
    })
    .finally(() => {
      uploading.value = false
    })
}
</script>
