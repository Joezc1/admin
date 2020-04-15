import request from '../utils/request'
// 获取话题列表
export function getAnswer(data){
    return request({
        url: '/answer/list',
        data: data,
        method: 'POST'
    })
}
// 获取话题详情
export function answerDetail(id) {
    return request({
        url: `/answer/${id}`,
        data: {},
        method: 'post'
    })
}

// 新增话题
export function newAnswer(data) {
    return request({
        url: '/save/answer',
        data,
        method: 'post'
    })
}

// 删除话题
export function deleteAnswer(data,id) {
    return request({
        url: `/delete/answer/${id}`,
        data,
        method: 'post'
    })
}
// 修改话题
export function updateAnswer(data,id) {
    return request({
        url: `/update/answer/${id}`,
        data,
        method: 'post'
    })
}
