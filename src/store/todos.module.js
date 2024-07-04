import ApiService from "@/services/api.service";

// endpoints
import endpoints from '../constant/endpoints'

// action types
const GET_USERS_TODOS = 'getUserTodos';

const state = {
  userTodos: [],
}

const getters = {
  userTodos(state) {
    return state.userTodos
  },
}

const actions = {
  [GET_USERS_TODOS](state, data) {
    state.commit(GET_USERS_TODOS, data)
  },
}

const mutations = {
  async [GET_USERS_TODOS](state, userId) {
    try {
      const response = await ApiService.get(`${endpoints.TODOS_ENDPOINT}?userId=${userId}`)
      state.userTodos = response
      console.log('users todos', response)
    }
    catch (error) {
      console.log('(error at get users todos)', error)
    }
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}
