import Layout from '@/views/layout'

export default  // 话题管理
{
  path: '/topic_manage',
  component: Layout,
  // name: 'topic_manage',
  adminname: '话题管理',
  icon: 'el-icon-edit-outline',
  meta: {
    title: '话题管理'
  },
  children: [
    {
      adminname: '话题列表',
      path: '',
      // path: 'topic_list',
      upperpath: '/topic_manage',
      component: () => import("../views/topicManage"),
      name: 'topic_list',
      meta: {
        title: '话题列表',
        keepAlive: false // 不需要缓存
      }
    }
  ]
}