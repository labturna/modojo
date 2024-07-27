const GET_CURRENT_CONTENT = 'getCurrentContent';
const GET_SOLUTION_CONTENT = 'getSolutionContent';
const SET_SHOW_SOLUTION = 'setShowSolution'
const state = {
  currentContents: {
    "name": "Welcome",
    "slug": "intro",
    "content": "01-introduction/welcome/lesson.md",
    "files": ["01-introduction/welcome/main.mo"],
    "solution": null
  },
  lessonContent: "",
  solutionContent: "",
  showSolution: false
}

const getters = {
  currentContents(state) {
    return state.currentContents
  },
  lessonContent(state) {
    return state.lessonContent
  },
  solutionContent(state) {
    return state.solutionContent
  },
  showSolution(state) {
    return state.showSolution
  },
}

const actions = {
  [GET_CURRENT_CONTENT](state, data) {
    state.commit(GET_CURRENT_CONTENT, data)
  },
  [GET_SOLUTION_CONTENT](state, data) {
    state.commit(GET_SOLUTION_CONTENT, data)
  },
  [SET_SHOW_SOLUTION](state, data) {
    state.commit(SET_SHOW_SOLUTION, data)
  },
}

const mutations = {
  async [GET_CURRENT_CONTENT](state, payload) {
    state.showSolution = false
    state.currentContents = payload
    const response = await fetch(`../content/${payload.content}`);
    state.lessonContent = await response.text();
  },
  async [GET_SOLUTION_CONTENT](state, payload) {
    state.showSolution = true
    const response = await fetch(`../content/${payload.solution}`);
    state.solutionContent = await response.text();
  },
  async [SET_SHOW_SOLUTION](state, payload) {
    state.showSolution = payload
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}
