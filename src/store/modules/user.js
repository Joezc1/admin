import { login, logout, getInfo } from '@/api/login'
import { Message, MessageBox } from 'element-ui'

import router from "../../router"

const user = {
  state: {
    username: sessionStorage.getItem('name') || 'zzcc',
    token: sessionStorage.getItem('token')
    // password: sessionStorage.getItem('userId') || 0,
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.username = name
    },
    SET_USERID: (state, id) => {
      state.userId = id
    },
    SET_TOKEN: (state ,token) => {
      state.token = token
    },
    // 前端 登出
    FedLogOut({ commit }) {
      sessionStorage.removeItem('login')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('name')
      sessionStorage.removeItem('menuindex')
      let list = []
      localStorage.setItem('tags', JSON.stringify(list))
    
      // localStorage.clear()
      // localStorage.removeItem('tags')
      // commit('SET_MENUS', [])
    }
  },

  actions: {
    // 登录
   Login({ commit }, userInfo) {
      const username = userInfo.name.trim()
      return new Promise((resolve, reject) => {
       login(username, userInfo.password)
          .then(response => {
            if(response.success){
              console.log("进行登录")
              console.log(response)
              // const data = response.data
              commit('SET_NAME', response.userinfo.username)
              commit('SET_TOKEN', response.token)
              sessionStorage.setItem('login', true)
              sessionStorage.setItem( 'token',response.token)
              // sessionStorage.setItem('name', data.name)
              Message.success(response.msg)
              resolve(true)
            }else{
              Message.error(response.msg)
              resolve(false)
            }
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const data = response.data
            commit('SET_PERMISSIONS', data)
            commit('SET_MENUS', data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.enable)
          .then(() => {
            commit('SET_ENABLE', 0)
            commit('SET_PERMISSIONS', [])
            sessionStorage.removeItem('login')
            sessionStorage.removeItem('name')
            commit('SET_MENUS', [])
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },


  }
}

export default user
