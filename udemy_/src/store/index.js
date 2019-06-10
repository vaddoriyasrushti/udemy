import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import actions from './actions'
import modules from './modules'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  actions,
  modules,
  mutations,
  state
})

export default store
