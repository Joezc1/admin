import request from '../utils/request'
// 获取话题列表
export function getTopics(data){
    return request({
        url: '/topiclist',
        data: data,
        method: 'POST'
    })
}
// 获取话题详情
export function topicDetail(data,id) {
    return request({
        url: `/topic/${id}`,
        data: data,
        method: 'post'
    })
}

// 新增话题
export function newTopic(data) {
    return request({
        url: '/save/topic',
        data,
        method: 'post'
    })
}

// 删除话题
export function deleteTopic(data,id) {
    return request({
        url: `/delete/topic/${id}`,
        data,
        method: 'post'
    })
}
// 修改话题
export function updateTopic(data,id) {
    return request({
        url: `/update/topic/${id}`,
        data,
        method: 'post'
    })
}
