import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(config=>{
    // 赋值token
    // config.headers.Authorization = sessionStorage.token
    return config
},err=>{
    return Promise.reject(err)
})

// axios的拦截器
http.interceptors.response.use(res=>{
    return res
} ,err =>{
if(err.response.data.message){
    Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
    })
}
    return Promise.reject(err)
})

export default http