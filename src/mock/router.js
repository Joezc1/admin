

import dashboard from "../router/dashboard"

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

export const routes = [
  {
    path: '/',
    name: 'login',
    hidden: true,//是否显示
    meta: {
      title: 'login'
    },
    component: () => import('@/views/login')
  },
  dashboard,
]
