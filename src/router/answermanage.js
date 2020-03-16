import Layout from '@/views/layout'

export default // 回答管理
{
  path: '/answer_manage',
  adminname: '回答管理',
  icon: 'el-icon-warning-outline',
  component: Layout,
  name: 'answer_manage',
  meta: {
    title: '回答管理'
  },
  children: [
    {
      adminname: '回答列表',
      // path: 'answer_list',
      path: '',
      upperpath: '/answer_manage',
      component: () => import("../views/answerManage"),
      name: 'answer_list',
      meta: {
        title: '回答列表',
        keepAlive: false // 不需要缓存
      }
    }
  ]
}