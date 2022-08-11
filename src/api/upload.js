import request from '@/utils/request'

export function ImageUpload(file) {
  let formdata = new FormData()
  formdata.append('file', file)
  return request.post('file/upload', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
}
