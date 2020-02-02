import request from '../utils/request'

export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}

// 获取用户信息
export function finduser(data,id) {
    return request({
        url: `/user/${id}`,
        method: 'post',
        data
    })
}