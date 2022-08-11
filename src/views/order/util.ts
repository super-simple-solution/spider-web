import { RowInfo } from '@/types/local'

export function formInit(data?: RowInfo): RowInfo {
  data = data || {}
  return {
    id: '',
    order_num: '',
    name: '',
    company_id: '',
    created_time: 0,
    order_type: '',
    bus_num: '',
    order_state: '',
    passenger_id_list: [],
    time_range: {
      from: new Date().getTime(),
      to: new Date().getTime(),
    },
    day_type: 1,
    plan_trip_list: [],
    total_cost: '',
    comments: '',
    ...data,
  }
}

import { dateTimeFormat } from '@/utils/moment'
import { Category, CategoryText, OrderState, OrderStateText, OrderType, OrderTypeText } from '@/api/share'

export function listProcess(list: RowInfo[], option: any = {}) {
  const { companyMap } = option
  list.forEach((item) => {
    item.created_time_text = dateTimeFormat(item.created_time * 1000)
    item.bus_category_text = CategoryText[item.bus_category as Category]
    item.company_id_text = companyMap[item.company_id]?.name ?? ''
    item.plan_trip_list_text = item.plan_trip_list.length
    item.order_type_text = OrderTypeText[item.order_type as OrderType]
    item.order_state_text = OrderStateText[item.order_state as OrderState]
    item.time_range.from = item.time_range.from * 1000
    item.time_range.to = item.time_range.to * 1000
  })
}

export function formParse(form: { plan_trip_list: any[]; id: number; time_range: { from: any; to: any } }) {
  form.plan_trip_list = form.plan_trip_list.map((item) => ({
    ...item,
    plan_depart_time: parseInt(String(new Date(item.plan_depart_time).getTime() / 1000)),
    order_id: form.id,
  }))
  const time_range = {
    from: String(form.time_range.from),
    to: String(form.time_range.to),
  }
  return {
    ...form,
    time_range: {
      from: time_range.from.match(/^[0-9]*$/)
        ? +time_range.from / 1000
        : parseInt(String(new Date(time_range.from).getTime() / 1000)),
      to: time_range.to.match(/^[0-9]*$/)
        ? +time_range.to / 1000
        : parseInt(String(new Date(time_range.to).getTime() / 1000)),
    },
  }
}
