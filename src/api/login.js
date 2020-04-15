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

// 获取用户信息
export function getInfo(username) {
  return request({
    url: '/resources/loadMenu',
    method: 'get',
    params: {username}
  })
}

export function logout(data) {
  return request({
    url: '/admin/user/logout',
    method: 'post',
    data
  })
}
