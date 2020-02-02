import request from '../utils/request'

// 新增公告
export function addNotice(data) {
  return request({
    url: '/save/notice',
    method: 'post',
    data: data
  })
}
// 公告列表
export function getNotices(data) {
  return request({
    url: '/noticelist',
    method: 'post',
    data: data
  })
}

// 查询公告
export function noticeDetail(data,id){
  return request({
    url: `/notice/${id}`,
    method: 'post',
    data: data
  })
}

// 删除公告
export function deleteNotice(data,id){
  return request({
    url: `/delete/notice/${id}`,
    data: data,
    method: 'post'
  })
}

// 修改公告
export function updateNotice(data,id){
  return request({
    url: `/update/notice/${id}`,
    data:data,
    method:'post'
  })
}