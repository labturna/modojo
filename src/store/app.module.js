

const SET_CURRENT_ROOT = 'setCurrentRoot';

const state = {
    currentRootName: ""
}

const getters = {
    currentRootName(state) {
        return state.currentRootName
    },
}

const actions = {
    [SET_CURRENT_ROOT](state, data) {
        state.commit(SET_CURRENT_ROOT, data)
    },
}

const mutations = {
    [SET_CURRENT_ROOT](state, root) {
        state.currentRootName = root
    },
}

export default {
    state,
    actions,
    mutations,
    getters
  }