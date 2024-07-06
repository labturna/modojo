

const SET_CURRENT_ROOT = 'setCurrentRoot';

const state = {
    currentRoot: ""
}

const getters = {
    currentRoot(state) {
        return state.currentRoot
    },
}

const actions = {
    [SET_CURRENT_ROOT](state, data) {
        state.commit(SET_CURRENT_ROOT, data)
    },
}

const mutations = {
    [SET_CURRENT_ROOT](state, root) {
        state.currentRoot = root
    },
}

export default {
    state,
    actions,
    mutations,
    getters
  }