import router from '@/router'

const admin = {
  state: {
    routes : router.options.routes,
    // router.options.routes
    tags: [],
    menuindex: sessionStorage.getItem('menuindex'),
    title: sessionStorage.getItem('title'),
  },

  mutations: {
    SET_TAGS: (state, name) => {
      state.tags = name
    },
    SET_LIST: (state, name) => {
      state.list = name
    },

  },

 
}

export default admin
