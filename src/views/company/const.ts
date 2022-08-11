import { TableConfig } from '@/types/local'

export const Type = {
  0: '有限责任公司',
  1: '股份有限公司',
  2: '中外合资企业',
  3: '全民所有制企业',
  4: '集体所有制企业',
  5: '独资企业',
  6: '国内生产企业',
  7: '进口产品国内总代理',
}
type dataOptions = {
  [key: string]: string | number
}

export const labelMap: dataOptions = {
  name: '企业名称',
  short_name: '企业简称',
  organization_code: '组织机构代码',
  type: '企业类型',
  contact: '联系人',
  telephone: '联系方式',
  address: '公司地址',
  pic_url: '营业执照',
  created_by_text: '添加人',
  created_time_text: '添加日期',
}

export const tableConfig: TableConfig = {
  index: true,
  list: ['name', 'created_by_text', 'created_time_text'].map((item) => ({
    prop: item,
    label: labelMap[item],
  })),
  operations: ['edit', 'delete'],
}

export const rules = {
  name: [
    {
      required: true,
      message: '请输入企业名称',
      trigger: 'blur',
    },
    {
      max: 20,
      message: '至多20个字符',
    },
  ],
  organization_code: [
    {
      required: true,
      message: '请输入组织机构代码',
      trigger: 'blur',
    },
    {
      max: 20,
      message: '至多40个字符',
    },
  ],
}
