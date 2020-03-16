import Layout from '@/views/layout'

export default  // 用户管理
{
  path: '/user_manage',
  component: Layout,
  name: 'user_manage',
  icon: 'el-icon-user',
  adminname: '用户管理',
  meta: {
    title: '用户管理'
  },
  children: [
    {
      adminname: '用户列表',
      upperpath: '/user_manage',
      // path: 'user_list',
      path: '',
      component: () => import("../views/userManage"),
      name: 'user_list',
      meta: {
        title: '用户列表',
        keepAlive: false // 不需要缓存
      }
    }
  ]
}