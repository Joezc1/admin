import request from '../utils/request'

export function getTopics(data){
    return request({
        url: '/topiclist',
        data: data,
        method: 'POST'
    })
}