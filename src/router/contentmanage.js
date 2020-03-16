import Layout from '@/views/layout'

export default  // 内容管理
{
  path: '/content_manage',
  component: Layout,
  adminname: '内容管理',
  name: 'content_manage',
  icon: 'el-icon-tickets',
  meta: {
    title: '内容管理'
  },
  children: [
    {
      // path: 'content_list',
      path: '',
      adminname: '公告管理',
      upperpath: '/content_manage',
      component: () => import("../views/contentManage"),
      name: 'content_list',
      meta: {
        title: '公告管理',
        keepAlive: false // 不需要缓存
      }
    }
  ]
}