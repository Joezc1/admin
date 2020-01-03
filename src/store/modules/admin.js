import router from '@/router'

const admin = {
  state: {
    routes : router.options.routes,
    tags: JSON.parse(localStorage.getItem('tags'))
  },

  mutations: {
    SET_TAGS: (state, name) => {
      state.tags = name
    },
  },

 
}

export default admin
