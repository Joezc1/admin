import { login, logout, getInfo } from '@/api/login'

const user = {
  state: {
    name: sessionStorage.getItem('name') || 'zzcc',
    userId: sessionStorage.getItem('userId') || 0,
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERID: (state, id) => {
      state.userId = id
    },
    // 前端 登出
    FedLogOut({ commit }) {
      sessionStorage.removeItem('login')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('name')
      sessionStorage.removeItem('menuindex')
      let list = []
      localStorage.setItem('tags',JSON.stringify(list))
      // localStorage.clear()
      // localStorage.removeItem('tags')
      // commit('SET_MENUS', [])
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const data = response.data
            commit('SET_USERID', data.id);
            commit('SET_NAME', data.name)
            sessionStorage.setItem('login', 1)
            sessionStorage.setItem('name', data.name)
            sessionStorage.setItem('userId', data.id)
            resolve()
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
