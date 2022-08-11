import { RowInfo } from '@/types/local'
import { initLocation } from '@/api/share'

export function formInit(data?: RowInfo): RowInfo {
  data = data || {}
  return {
    id: '',
    name: '',
    company_id: '',
    telephone: '',
    id_card: '',
    location: initLocation(),
    active: '',
    ...data,
  }
}

import { dateTimeFormat } from '@/utils/moment'
export function listProcess(list: RowInfo[], option: any = {}) {
  const { companyMap } = option
  list.forEach((item) => {
    item.created_time_text = dateTimeFormat(item.created_time * 1000)
    item.company_id_text = companyMap[item.company_id]?.name ?? ''
  })
}
