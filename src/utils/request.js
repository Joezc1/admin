import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// 创建axios实例


const service = axios.create({
  // baseURL: "http://39.106.159.120:8080/admin/api",
  baseURL: "/api",
//   baseURL: process.env.NODE_ENV === 'production' ? '' : '/api/', // api的base_url
  timeout: 20000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(
  config => {
	// config.headers.userId = store.getters.userid
	// config.headers.name = store.getters.enable
	// config.headers.language = store.getters.enable
	// config.headers.Authorization = `JSESSIONID=${Cookies.get('JSESSIONID')}`
    // if (c
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非1000是抛错
     */
    const res = response
    // if (Number(res.state) > 5000) {
    //   if (res.state !== '10000') {
    // Message({
    //   message: res.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    //     return Promise.reject('error')
    //   } else {
    //     return response.data
    //   }
    // }
    if (!res.data.success) {
      // -1:用户未登录;
      if (res.data.code === '-1') {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        })
      } else if (res.data.code === '0') { // 0:不允许;
        Message({
          message: res.data.msg,
          type: 'error',
          duration: 5 * 1000
        })
        return response.data
      } else {
        // Message({
        //   message: res.data.msg,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        return response.data
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('error在这' + error) // for debug
    Message({
      message: '请求失败，请稍后重试',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

