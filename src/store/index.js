import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import admin from './modules/admin'
import getters from './getter'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    admin,
  },
  getters,
  plugins: [createPersistedState()]
})

export default store
