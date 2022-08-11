export enum SysRole {
  Dummy = 0,
  Root = 1, // 1、管理人员 RW
  SystemMonitor = 2, // 2、安全监管员 RW
  Scheduler = 3, // 3、调度员 RW
  Driver = 4, // 4、司机 RW
  MachineManager = 5, // 5、机务管理 RW
  MachineRepair = 6, // 6、机务修理工 RW
  MachineQA = 7, // 7、机务质检员 RW
  MachineFrontDesk = 8, // 8、机务前台
  WarehouseManager = 9, //9、机务库管
  PassengerMsgManager = 10, //信息管理员
  MachineExec = 11, // 机务业务员
  MachineApprover = 12, // 机务大额审批员
  SystemAdmin = 13, // 系统管理员
}

export interface BaseResponse {
  code: number
  msg: string
}

export interface BaseListArg {
  count_only: boolean
  start: number
  count: number
}

export enum Type {
  LLC = 0, // 有限责任公司
  INC = 1, // 股份有限公司
  SinoForeign = 2, // 中外合资
  StateOwned = 3, // 全民所有制
  CollectiveOwned = 4, // 集体所有制
  SoleOwned = 5, // 独资
  manufacturer = 6, // 国内生产企业
  TradeAgency = 7, // 进口产品国内总代理
}

export enum MessageType {
  MT_Location = 0,
  MT_ArriveLeaveStop = 1,
  MT_VideoList = 2,
  MT_Violation = 3,
  MT_UpgradeResult = 4,
  MT_ATTENDANCE = 5, // 考勤
  MT_Ignore = 100,
}

export enum Protocol {
  P_HaiXin,
  P_RuiMing,
}

export interface Header {
  terminal_unique_id: string
  sequence_no: number
  message_type: MessageType
  protocol: Protocol
}
export interface Location {
  header: Header
  latitude: number
  longitude: number
  altitude: number
}

function initHeader() {
  return {
    terminal_unique_id: '',
    sequence_no: 0,
    message_type: 0,
    protocol: 0,
  }
}

export function initLocation(): Location {
  return {
    header: initHeader(),
    latitude: 0,
    longitude: 0,
    altitude: 0,
  }
}

// 车辆类型
export enum Category {
  BMC_Large = 1, //1:大型
  BMC_Medium = 2, // 2:中型
  BMC_Small = 3, // 3:小型
  BMC_Micro = 4, // 4:微型
}
export const CategoryText: Record<Category, string> = {
  [Category.BMC_Large]: '大型',
  [Category.BMC_Medium]: '中型',
  [Category.BMC_Small]: '小型',
  [Category.BMC_Micro]: '微型',
} as const

export const CategoryList = [
  {
    value: Category.BMC_Large,
    label: CategoryText[Category.BMC_Large],
  },
  {
    value: Category.BMC_Medium,
    label: CategoryText[Category.BMC_Medium],
  },
  {
    value: Category.BMC_Small,
    label: CategoryText[Category.BMC_Small],
  },
  {
    value: Category.BMC_Micro,
    label: CategoryText[Category.BMC_Micro],
  },
]

// 订单状态
export enum OrderState {
  OS_Audit = 1, // audit
  OS_REJECTION = 2, // reject
  OS_PASSING = 3, // pass
}

export enum OrderType {
  OT_LONG_TIME = 1, // bus for a long time
  OT_SHORT_TIME = 2, // bus for a short time
}

export const OrderTypeText: Record<OrderType, string> = {
  [OrderType.OT_LONG_TIME]: '长期包车',
  [OrderType.OT_SHORT_TIME]: '短期包车',
} as const

export const OrderStateText: Record<OrderState, string> = {
  [OrderState.OS_Audit]: '待审核',
  [OrderState.OS_REJECTION]: '驳回',
  [OrderState.OS_PASSING]: '审核通过',
} as const

export const OrderStateList = [
  {
    value: OrderState.OS_Audit,
    label: OrderStateText[OrderState.OS_Audit],
  },
  {
    value: OrderState.OS_REJECTION,
    label: OrderStateText[OrderState.OS_REJECTION],
  },
  {
    value: OrderState.OS_PASSING,
    label: OrderStateText[OrderState.OS_PASSING],
  },
]
