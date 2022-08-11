import request from '@/utils/request'

const path = {
  list: 'employee/list',
}

export function listAll() {
  return request
    .post(path.list, {
      list_arg: {
        count_only: false,
        start: 0,
        count: 0,
      },
    })
    .then((res) => res?.employee_list ?? [])
}
