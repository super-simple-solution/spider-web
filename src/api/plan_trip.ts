// 车次管理

import request from '@/utils/request'

const path = {
  listPlanTrip: 'buscustomized/list_plan_trip',
  updatePlanTrip: 'buscustomized/update_plan_trip',
}

export function listPlanTrip(...paramsRest: any[]): Promise<any> {
  return request.post(path.listPlanTrip, ...paramsRest)
}

export function updatePlanTrip(...paramsRest: any[]): Promise<any> {
  return request.post(path.updatePlanTrip, ...paramsRest)
}
