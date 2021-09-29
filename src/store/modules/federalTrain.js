const federalTrain = {
  namespaced: true,
  state: {
    guest: null,
    host: null
  },
  mutations: {
    UPDATE_PARTNER(state, { host, guest }) {
      state.guest = guest
      state.host = host
    }
  },
  actions: {}
}
export default federalTrain
