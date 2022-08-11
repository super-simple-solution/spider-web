import request from '@/utils/request'

const path = {
  list: 'bus/list',
}

export function listAll() {
  return request
    .post(path.list, {
      list_arg: {
        count_only: false,
        start: 0,
        count: 0,
      },
      terminal_type: -1,
    })
    .then((res) => res?.bus_list ?? [])
}
