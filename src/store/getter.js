const getters = {
    userid:state => state.user.userid,
    username: state => state.user.username,
    level: state => state.user.level,
    routes: state => state.user.routes,
    tags: state => state.admin.tags,
    menuindex: state => state.admin.menuindex,
    token: state => state.user.token,
    login: state => state.user.login,
    routes: state => state.admin.routes
    // menuList: state => state.user.menuList,
    // getMenu:state => state.user.getMenu,
    // routeLength: state => state.user.routeLength
}
export default getters
  