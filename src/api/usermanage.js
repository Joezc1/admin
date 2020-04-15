import request from '../utils/request'
// 获取用户列表
export function List(data){
    return request({
        url: '/wx/user/list',
        data: data,
        method: 'POST'
    })
}
// 获取用户详情
export function Detail(id) {
    return request({
        url: `/user/${id}`,
        data: {},
        method: 'post'
    })
}


// 删除用户
export function Delete(id) {
    return request({
        url: `/delete/user/${id}`,
        data:{},
        method: 'post'
    })
}
// 修改用户
export function Update(data,id) {
    return request({
        url: `/update/user/${id}`,
        data,
        method: 'post'
    })
}
