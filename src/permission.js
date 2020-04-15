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
    if (store.getters.login == 1) {
        NProgress.done()
        next()
        // if (store.getters.getMenu) {
        //     // 解决页面刷新失效
        //     if (router.options.routes.length < store.getters.routeLength) {
        //         store.commit("AddRoutes")
        //         next({
        //             ...to,
        //             replace: true
        //         })
        //         NProgress.done()
        //     } else {
        //         next()
        //         NProgress.done()
        //     }
        // } else {
        //     store.commit("AddRoutes")
        //     store.commit("SET_ROUTELENGTH", router.options.routes.length)
        //     store.commit("SET_GETMENU", true)

        //     NProgress.done()
        //     next({
        //         ...to,
        //         replace: true
        //     }) // hack方法 确保addRoutes已完成

        // }
    } else {
        next({ name: 'login' })
        NProgress.done()
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})

