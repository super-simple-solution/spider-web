import request from '@/utils/request'

const path = {
  list: 'buscustomized/list_line',
  list_line: 'buscustomized/list_line',
}

export function listAll() {
  return request
    .post(path.list, {
      list_arg: {
        count_only: false,
      },
    })
    .then((res) => res?.line_list ?? [])
}
