import { login, logout, getInfo } from '@/api/login'
import { Message, MessageBox } from 'element-ui'
import * as mock from "../../mock/data"
import * as routerdate from "../../mock/router"

import router from "../../router"

const user = {
  state: {
    menuList: [],
    // username: sessionStorage.getItem('username') || 'zzcc',
    // token: sessionStorage.getItem('token'),
    // userid: sessionStorage.getItem('userid') || 0,
    // login: sessionStorage.getItem('login'),
    // level: sessionStorage.getItem('level')
    username: '',
    token: '',
    userid: '',
    login: '',
    level: '',
    // getMenu: false,
    // routeLength: 0
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.username = name
    },
    SET_USERID: (state, id) => {
      state.userid = id
    },
    SET_TOKEN: (state ,token) => {
      state.token = token
    },
    SET_LOGIN: (state,login) => {
      state.login = login
    },
    SET_LEVEL: (state,level) => {
      state.level = level
    },
    SET_MENULIST:(state,list) => {
      state.menuList = list
    },
    SET_GETMENU:(state,getMenu) => {
      state.getMenu = getMenu
    },
    SET_ROUTES:(state,router) => {
      state.routes = router
    },
    SET_ROUTELENGTH:(state,length) => {
      state.routeLength = length
    },
    // 动态添加路由
    AddRoutes:(state) => {
      let list = []
      state.menuList.forEach(element => {
          let obj = mock.localRouter.find(e => {
              return e.path === element.path;
          });
          if (obj) {
              obj.hidden = element.hidden == 0 ? false : true
              obj.adminname = element.adminname
              obj.level = element.level
              list.push(obj)
          }
      });
      // debugger
      for (let item of list) {
          router.options.routes.push(item)
      }
     
      router.addRoutes(list)
    },
    // 前端 登出
    FedLogOut(state) {
      sessionStorage.removeItem('login')
      sessionStorage.removeItem('userid')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('menuindex')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('level')
      let list = []
      localStorage.setItem('tags', JSON.stringify(list))
      state.getMenu = false
      state.login = 0
      state.userid = ''
      state.username = ''
      state.routes = []
      state.level = 0

      // state.menuList = []
      // state.routeLength = 0
      // router.options.routes = routerdate.routes

      // console.log(state)

      // localStorage.clear()
      // localStorage.removeItem('tags')
      // commit('SET_MENUS', [])
    }
  },

  actions: {
    // 登录,获取菜单
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
              commit('SET_USERID', response.userinfo.id)
              commit('SET_TOKEN', response.token)
              commit('SET_LEVEL', response.userinfo.level)
              commit('SET_LOGIN', response.userinfo.login)

              // commit('SET_MENULIST',response.menulist)
              // console.log("routes")
              // console.log(router.options.routes)
              // commit('SET_ROUTES',router.options.routes)

              sessionStorage.setItem('login', response.userinfo.login)
              sessionStorage.setItem( 'userid',response.userinfo.id)
              sessionStorage.setItem( 'username',response.userinfo.username)
              sessionStorage.setItem( 'level',response.userinfo.username)
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

    // 获取用户信息(包括获取菜单资源)
    GetMenu({ commit },username) {
      return new Promise((resolve, reject) => {
        getInfo(username)
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
    LogOut({ commit,state }) {
      return new Promise((resolve, reject) => {
        logout({userid: state.userid})
          .then(() => {
            commit("FedLogOut")
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
