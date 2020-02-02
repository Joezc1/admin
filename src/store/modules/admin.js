import router from '@/router'

const admin = {
  state: {
    routes : router.options.routes,
    tags: JSON.parse(localStorage.getItem('tags')),
    menuindex: sessionStorage.getItem('menuindex') 
  },

  mutations: {
    SET_TAGS: (state, name) => {
      state.tags = name
    },
  },

 
}

export default admin
