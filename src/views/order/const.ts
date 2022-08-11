import { TableConfig } from '@/types/local'

export const Type = {
  0: '有限责任公司',
  1: '股份有限公司',
  2: '中外合资',
  3: '全民所有制',
  4: '集体所有制',
  5: '独资',
  6: '国内生产企业',
  7: '进口产品国内总代理',
}
type dataOptions = {
  [key: string]: string | number
}

export const labelMap: dataOptions = {
  order_num: '订单编号',
  name: '订单名',
  company_id: '来源企业',
  company_id_text: '来源企业',
  order_type: '订单类型',
  order_type_text: '订单类型',
  order_state_text: '订单状态',
  bus_num: '需求车辆数',
  plan_trip_list_text: '每日车次数',
  created_time: '订单时间',
  created_time_text: '订单时间',
  total_cost: '总费用',
  comments: '备注信息',
  day_type: '每日车次列表',
}

export const tableConfig: TableConfig = {
  index: true,
  indexText: '订单编号',
  list: [
    'name',
    'company_id_text',
    'order_type_text',
    'bus_num',
    'plan_trip_list_text',
    'created_time_text',
    'order_state_text',
    'total_cost',
  ].map((item) => ({
    prop: item,
    label: labelMap[item],
  })),
  operations: ['detail', 'edit', 'delete'],
}

export const rules = {
  name: [],
  short_name: [],
  type: [],
  contact: [],
  telephone: [],
  address: [],
  pic_url: [],
}

export enum DayType {
  DT_EVERYDAY = 1, // every day
  DT_WORKDAY = 2, // work day
}

export const DayTypeTextMap: Record<DayType, string> = {
  [DayType.DT_EVERYDAY]: '每日',
  [DayType.DT_WORKDAY]: '仅工作日',
} as const
