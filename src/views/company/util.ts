import { RowInfo } from '@/types/local'

export function formInit(data?: RowInfo): RowInfo {
  data = data || {}
  return {
    id: '',
    name: '',
    short_name: '',
    organization_code: '',
    type: 0,
    contact: '',
    telephone: '',
    address: '',
    pic_url: '',
    created_by: '',
    created_time: '',
    active: '',
    ...data,
  }
}

import { dateTimeFormat } from '@/utils/moment'

export function listProcess(list: RowInfo[], option: any = {}) {
  const { employeeMap } = option

  list.forEach((item) => {
    item.created_time_text = dateTimeFormat(item.created_time * 1000)
    item.created_by_text = employeeMap[item.created_by]?.name ?? ''
  })
}
