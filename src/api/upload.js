import request from '../utils/request'

export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}

export const defaultUrl = 'http://localhost:8080/admin/api/upload'
// export const defaultUrl = 'http://39.106.159.120:8080/admin/api/upload'
