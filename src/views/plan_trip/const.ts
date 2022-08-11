import { TableConfig } from '@/types/local'

type dataOptions = {
  [key: string]: string | number
}

export const labelMap: dataOptions = {
  bus_id: '车牌号',
  driver_id: '司机',
  exec_date: '日期',
  plan_depart_time: '发车时间',
}

export const tableConfig: TableConfig = {
  index: true,
  list: ['exec_date', 'name', 'plan_depart_time', 'telephone', 'id_card'].map((item) => ({
    prop: item,
    label: labelMap[item],
  })),
  operations: ['edit', 'delete'],
}

export const rules = {
  name: [],
}
