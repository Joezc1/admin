import request from '../utils/request'
// 获取话题列表
export function getTopics(data){
    return request({
        url: '/answer/list',
        data: data,
        method: 'POST'
    })
}
// 获取话题详情
export function topicDetail(data,id) {
    return request({
        url: `/answer/${id}`,
        data: data,
        method: 'post'
    })
}

// 新增话题
export function newTopic(data) {
    return request({
        url: '/save/answer',
        data,
        method: 'post'
    })
}

// 删除话题
export function deleteTopic(data,id) {
    return request({
        url: `/delete/answer/${id}`,
        data,
        method: 'post'
    })
}
// 修改话题
export function updateTopic(data,id) {
    return request({
        url: `/update/answer/${id}`,
        data,
        method: 'post'
    })
}
