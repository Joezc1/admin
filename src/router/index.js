import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import dataanalysis from "./dataanalysis"
import topicmanage from "./topicmanage"
import answermanage from "./answermanage"
import contentmanage from "./contentmanage"
import usermanage from "./usermanage"
import dashboard from "./dashboard"

Vue.use(VueRouter)

// 数据分析
//  {
//   path: '/data_analysis',
//   component: Layout,
//   name: 'data_analysis',
//   adminname: '数据分析',//显示名称
//   icon: 'el-icon-data-analysis',//icon图片
//   meta: {
//     title: 'data_analysis'
//   },
//   children: [
//     {
//       path: 'analysis_list',
//       component: () => import("../views/dataAnalysis"),
//       adminname: '数据列表',
//       upperpath: /data_analysis,//上级路径
//       name: 'analysis_list',
//       meta: {
//         title: 'analysis_list',
// keepAlive: false // 不需要缓存
//       }
//     }
//   ]
// },

const routes = [
  {
    path: '/',
    name: 'login',
    hidden: true,//是否显示
    meta: {
      title: 'login'
    },
    component: () => import('../views/login')
  },
  {
    path: '/Layout',
    name: 'Layout',
    hidden: true,
    component: () => import('../views/layout')
  },
  {
    path: '/tuozhuaiDemo',
    name: 'tuozhuaiDemo',
    hidden: true,
    component: () => import('../views/tuozhuaiDemo')
  },
  dashboard,
  dataanalysis,
  topicmanage,
  answermanage,
  contentmanage,
  usermanage,
  // EchartDemo
  {
    path: '/echart_demo',
    hidden: true,
    component: () => import("../views/echartDemo"),
    name: 'echart_demo'
  }
]
const router = new VueRouter({
  routes
})

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

NProgress.configure({
  showSpinner: false
})


router.beforeEach((to, from, next) => {
  NProgress.start()
  // if (store.getters.enable) {

  // } else {
  //   /* has no token*/
  //   if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     next('/login') // 否则全部重定向到登录页
  //     // next()
  //     NProgress.done()
  //   }
  // }
  next()
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router
