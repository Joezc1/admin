import request from '../utils/request'

export function login(username, password) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: 'resources/loadMenu',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'logout',
    method: 'get'
  })
}
