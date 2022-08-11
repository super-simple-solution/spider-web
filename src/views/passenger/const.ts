import { TableConfig } from '@/types/local'
import { patternMap } from '@/utils/validate'

type dataOptions = {
  [key: string]: string | number
}

export const labelMap: dataOptions = {
  name: '姓名',
  company_id: '所属公司',
  company_name: '所属公司',
  company_id_text: '所属公司',
  telephone: '电话',
  type: '企业类型',
  id_card: '身份证号',
  code: '编号',
  address: '家庭住址',
}

export const tableConfig: TableConfig = {
  index: true,
  list: ['code', 'name', 'company_id_text', 'telephone', 'id_card'].map((item) => ({
    prop: item,
    label: labelMap[item],
  })),
  operations: ['edit', 'delete'],
}

export const rules = {
  name: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    },
    {
      max: 10,
      message: '至多10个字符',
    },
  ],
  telephone: [
    {
      pattern: patternMap.isPhone,
      message: '请输入11位手机号码',
      trigger: 'blur',
    },
  ],
  id_card: [
    {
      pattern: patternMap.isIdNumber,
      message: '请输入正确的身份证号',
      trigger: 'blur',
    },
  ],
}
