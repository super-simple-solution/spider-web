import request from '@/utils/request'

const path = {
  listPassenger: 'buscustomized/list_passenger',
  createPassenger: 'buscustomized/create_passenger',
  updatePassenger: 'buscustomized/update_passenger',
}

export function listPassenger(...paramsRest: any[]): Promise<any> {
  return request.post(path.listPassenger, ...paramsRest)
}

export function createPassenger(...paramsRest: any[]): Promise<any> {
  return request.post(path.createPassenger, ...paramsRest)
}

export function updatePassenger(...paramsRest: any[]): Promise<any> {
  return request.post(path.updatePassenger, ...paramsRest)
}
