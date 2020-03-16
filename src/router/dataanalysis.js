import Layout from '@/views/layout'


export default {
    path: '/data_analysis',
    component: Layout,
    name: 'data_analysis',
    adminname: '数据分析',
    icon: 'el-icon-data-analysis',
    meta: {
      title: '数据分析'
    },
    children: [
      {
        // path: 'analysis_list',
        path: '',
        component: () => import("../views/dataAnalysis"),
        adminname: '数据列表',
        name: 'analysis_list',
        upperpath: '/data_analysis',
        meta: {
          title: '数据列表',
          keepAlive: false // 不需要缓存
        }
      }
    ]
  }