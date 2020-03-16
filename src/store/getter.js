const getters = {
    userid:state => state.user.userId,
    name: state => state.user.name,
    routes: state => state.admin.routes,
    tags: state => state.admin.tags,
    menuindex: state => state.admin.menuindex,
    token: state => state.user.token
}
export default getters
  