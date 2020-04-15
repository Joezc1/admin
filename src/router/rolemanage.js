import Layout from '@/views/layout'

export default  // 权限管理
{
  path: '/role_manage',
  component: Layout,
  name: 'role_manage',
  icon: 'el-icon-user',
  adminname: '权限管理',
  meta: {
    title: '权限管理'
  },
  children: [
    {
      adminname: '用户列表',
      upperpath: '/role_manage',
      // path: 'user_list',
      path: '',
      component: () => import("../views/userManage"),
      // name: 'user_list',
      meta: {
        title: '用户列表',
        keepAlive: false // 不需要缓存
      }
    },
    {
      adminname: '角色列表',
      upperpath: '/role_manage',
      // path: 'user_list',
      path: 'role_list',
      component: () => import("../views/userManage/rolelist"),
      name: 'role_list',
      meta: {
        title: '角色列表',
        keepAlive: false // 不需要缓存
      }
    }
  ]
}