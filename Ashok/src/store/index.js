import Vuex from 'vuex'
import Vue from 'vue'

import loginModules from './modules/logIn.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    login: loginModules
  }
})

export default store
