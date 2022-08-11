import request from '@/utils/request'

const path = {
  listCompany: 'buscustomized/list_company',
  createCompany: 'buscustomized/create_company',
  updateCompany: 'buscustomized/update_company',
  deleteCompany: 'buscustomized/delete_company',
}

export function listAll() {
  return request
    .post(path.listCompany, {
      list_arg: {
        count_only: false,
        start: 0,
        count: 0,
      },
    })
    .then((res) => res?.company_list ?? [])
}

export function listCompany(...paramsRest: any[]): Promise<any> {
  return request.post(path.listCompany, ...paramsRest)
}

export function createCompany(...paramsRest: any[]): Promise<any> {
  return request.post(path.createCompany, ...paramsRest)
}

export function updateCompany(...paramsRest: any[]): Promise<any> {
  return request.post(path.updateCompany, ...paramsRest)
}

export function deleteCompany(...paramsRest: any[]): Promise<any> {
  return request.post(path.deleteCompany, ...paramsRest)
}
