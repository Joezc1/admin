import { Message } from 'element-ui'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import router from "./router"
import * as mock from "./mock/data"


router.beforeEach((to, from, next) => {
    NProgress.start()
    // NProgress.done()
    // next()
    console.log(store.getters)
    if (store.getters.login == 1) {
        NProgress.done()
        next()
        // console.log("1111")
        // if (store.getters.getMenu) {
        //     // 解决页面刷新失效
        //     if (router.options.routes.length < store.getters.routeLength) {
        //         console.log("2222")
        //         store.commit("AddRoutes")
        //         next()
        //         NProgress.done()
        //     } else {
        //         console.log("3333")
        //         next()
        //         NProgress.done()
        //     }
        // } else {
        //     store.commit("AddRoutes")
        //     store.commit("SET_ROUTELENGTH", router.options.routes.length)
        //     store.commit("SET_GETMENU", true)
        //     NProgress.done()
        //     console.log("4444")
        //     next() // hack方法 确保addRoutes已完成
        // }
    } else {
        if (to.path == '/') {
            next()
            NProgress.done()
        } else {
            next("/")
            NProgress.done()
        }

    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})

