import request from '../utils/request'

export function list(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data
  })
}

export function detail(id) {
  return request({
    url: `/role/${id}`,
    method: 'post',
    data:{}
  })
}

export function newrole(data) {
  return request({
    url: '/save/role',
    method: 'post',
    data
  })
}

export function updaterole(data,id) {
    return request({
      url: `/update/role/${id}`,
      method: 'post',
      data
    })
}
  
export function deleterole(id) {
    return request({
      url: `/delete/role/${id}`,
      method: 'post',
      data:{}
    })
}
  