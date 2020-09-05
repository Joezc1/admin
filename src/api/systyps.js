// /sysinfo/list

import request from '../utils/request'
// 获取话题列表
export function getSystem(){
    return request({
        url: '/sysinfo/list',
        data: {},
        method: 'POST'
    })
}
// /taginfo/list
export function getTags(){
    return request({
        url: '/taginfo/list',
        method: 'GET'
    })
}