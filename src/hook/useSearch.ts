import { OpOption, DataOptions } from '@/types/local'

interface Option {
  defaultForm?: DataOptions
  searchOption?: object
  autoTrigger?: boolean
  emit: (event: 'op', ...args: any[]) => void
}

function formInit(defaultForm: any): DataOptions {
  return JSON.parse(JSON.stringify(defaultForm))
}

export default function useSearch(option: Option) {
  const { defaultForm = {}, searchOption = {}, autoTrigger = true, emit } = option
  const form = reactive(formInit(defaultForm))

  function updateForm(data: any) {
    for (const key in data) {
      form[key] = data[key]
    }
  }

  function op(option: OpOption) {
    emit('op', option)
  }

  function toEdit(option: object) {
    emit('op', {
      name: 'add',
      option,
    })
  }
  function toSearch() {
    emit('op', {
      name: 'search',
      option: parseOption({
        ...searchOption,
        ...form,
      }),
    })
  }

  onMounted(() => {
    if (autoTrigger) {
      toSearch()
    }
  })

  return {
    state: {
      form,
    },
    op,
    toEdit,
    toSearch,
    updateForm,
  }
}

const timeKeys = ['date', 'time']
function parseOption(option: any) {
  const res: any = {}
  for (const key in option) {
    if (timeKeys.find((item) => key.includes(item))) {
      res[key] = Math.ceil(new Date(option[key]).getTime() / 1000)
    } else {
      res[key] = option[key]
    }
  }
  return res
}
