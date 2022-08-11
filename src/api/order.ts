import request from '@/utils/request'

const path = {
  listOrder: 'buscustomized/list_order',
  updateOrder: 'buscustomized/update_order',
  deleteOrder: 'buscustomized/delete_order',
}

export function listOrder(...paramsRest: any[]): Promise<any> {
  return request.post(path.listOrder, ...paramsRest)
}

export function updateOrder(...paramsRest: any[]): Promise<any> {
  return request.post(path.updateOrder, ...paramsRest)
}

export function deleteOrder(...paramsRest: any[]): Promise<any> {
  return request.post(path.deleteOrder, ...paramsRest)
}
