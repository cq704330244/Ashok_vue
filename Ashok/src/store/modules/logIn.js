const loginModules = {
  state: {
    userInfo: {}
  },

  mutations: {
    storeUserInfo(state, playload) {
      state.userInfo = playload
    }
  },

  actions: {},

  getters: {}
}
export default loginModules
