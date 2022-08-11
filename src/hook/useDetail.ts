import { reactive, watch, defineEmits } from 'vue'
import { flagType } from '@/const/index'
export default function useDetail() {
  const detailData = reactive({
    visible: false,
    picDialog: false,
    imageUrl: '',
  })

  const props = defineProps({
    flag: {
      type: Number,
      default: 1,
    },
    rowInfo: {
      type: Object,
      default: () => ({}),
    },
  })
  watch(
    () => props.flag,
    (val) => {
      detailData.visible = val === flagType.detail
    },
  )

  const emit = defineEmits(['reset'])
  const cancel = () => emit('reset', false)

  return {
    cancel,
    detailData,
  }
}
