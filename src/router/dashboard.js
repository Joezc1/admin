import Layout from '@/views/layout'


export default {
    path: '/dashboard_manage',
    component: Layout,
    // name: 'dashboard_manage',
    adminname: '首页',
    icon: 'el-icon-data-analysis',
    meta: {
      title: 'home'
    },
    children: [
      {
        // path: 'dashboard',
        path: '',
        component: () => import("../views/dashboard"),
        adminname: '仪表盘',
        name: 'dashboard',
        upperpath: '/dashboard_manage',
        meta: {
          title: 'dashboard',
          keepAlive: false // 不需要缓存
        }
      }
    ]
  }