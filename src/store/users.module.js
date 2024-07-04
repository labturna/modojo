import ApiService from "@/services/api.service";

// endpoints
import endpoints from '../constant/endpoints'

// action types
const IS_USERS_PAGE = 'isUsersPage';
const GET_ALL_USERS = 'getAllUsers';
const GET_CURRENT_USER = 'getCurrentUser';

const state = {
  isUsersPage: true,
  userList: [],
  currentUser: null
}

const getters = {
  isUsersPage(state) {
    return state.isUsersPage
  },
  userList(state) {
    return state.userList
  },
  currentUser(state) {
    return state.currentUser
  }
}

const actions = {
  [IS_USERS_PAGE](state, data) {
    state.commit(IS_USERS_PAGE, data)
  },
  [GET_ALL_USERS](state) {
    state.commit(GET_ALL_USERS)
  },
  [GET_CURRENT_USER](state, data) {
    state.commit(GET_CURRENT_USER, data)
  },
}

const mutations = {
  [IS_USERS_PAGE](state, data) {
    state.isUsersPage = data
  },
  async [GET_ALL_USERS](state) {
    try {
      const response = await ApiService.get(endpoints.USERS_ENDPOINT)
      state.userList = response
    }
    catch (error) {
      // notification (swal) can be added
      console.log('(error at get all users)', error)
    }
  },
  async [GET_CURRENT_USER](state, userId) {
    try {
      const response = await ApiService.get(`${endpoints.USERS_ENDPOINT}/${userId}`)
      localStorage.setItem('user', JSON.stringify(response));
      state.currentUser = JSON.parse(localStorage.getItem('user'));
    }
    catch (error) {
      // notification (swal) can be added
      console.log('(error at get current user error)', error)
    }
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}
