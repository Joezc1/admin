import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'

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
  //         title: 'analysis_list'
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
   // 数据分析
   {
    path: '/data_analysis',
    component: Layout,
    name: 'data_analysis',
    adminname: '数据分析',
    icon: 'el-icon-data-analysis',
    meta: {
      title: 'data_analysis'
    },
    children: [
      {
        path: 'analysis_list',
        component: () => import("../views/dataAnalysis"),
        adminname: '数据列表',
        name: 'analysis_list',
        upperpath: '/data_analysis',
        meta: {
          title: 'analysis_list'
        }
      }
    ]
  },
  // 话题管理
  {
    path: '/topic_manage',
    component: Layout,
    name: 'topic_manage',
    adminname: '话题管理',
    icon: 'el-icon-edit-outline',
    meta: {
      title: 'topic_manage'
    },
    children: [
      {
        adminname: '话题列表',
        path: 'topic_list',
        upperpath: '/topic_manage',
        component: () => import("../views/topicManage"),
        name: 'topic_list',
        meta: {
          title: 'topic_list'
        }
      }
    ]
  },
  // 回答管理
  {
    path: '/answer_manage',
    adminname: '回答管理',
    icon: 'el-icon-warning-outline',
    component: Layout,
    name: 'answer_manage',
    meta: {
      title: 'answer_manage'
    },
    children: [
      {
        adminname: '回答列表',
        path: 'answer_list',
        upperpath: '/answer_manage',
        component: () => import("../views/answerManage"),
        name: 'answer_list',
        meta: {
          title: 'answer_list'
        }
      }
    ]
  },
  // 内容管理
  {
    path: '/content_manage',
    component: Layout,
    adminname: '内容管理',
    name: 'content_manage',
    icon: 'el-icon-tickets',
    meta: {
      title: 'content_manage'
    },
    children: [
      {
        path: 'content_list',
        adminname: '公告管理',
        upperpath: '/content_manage',
        component: () => import("../views/contentManage"),
        name: 'content_list',
        meta: {
          title: 'content_list'
        }
      }
    ]
  },
  // 用户管理
  {
    path: '/user_manage',
    component: Layout,
    name: 'user_manage',
    icon: 'el-icon-user',
    adminname: '用户管理',
    meta: {
      title: 'user_manage'
    },
    children: [
      {
        adminname: '用户列表',
        upperpath: '/user_manage',
        path: 'user_list',
        component: () => import("../views/userManage"),
        name: 'user_list',
        meta: {
          title: 'user_list'
        }
      }
    ]
  },
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

export default router
