// import { SysRole, BaseResponse } from './share'
// import { AxiosRequestConfig } from 'axios'
import request from '@/utils/request'

const path = {
  logout: 'sys/logout',
  userInfo: 'sys/userinfo',
  getUserRelatedInfo: 'userline/getuserrelatedinfo',
}

export function getUserInfo(...paramsRest: any[]): Promise<any> {
  return request.post(path.userInfo, ...paramsRest)
}

export function logout(...paramsRest: any[]): Promise<any> {
  return request.post(path.logout, ...paramsRest)
}

export function getUserRelatedInfo(...paramsRest: any[]): Promise<any> {
  return request.post(path.getUserRelatedInfo, ...paramsRest).then((res) => {
    return {
      department_id_list: res.department_id_list,
      line_id_list: res.line_id_list,
      subline_id_list: res.subline_id_list,
    }
  })
}
