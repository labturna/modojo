const GET_CURRENT_CONTENT = 'getCurrentContent';
const GET_SOLUTION_CONTENT = 'getSolutionContent';
const SET_SHOW_SOLUTION = 'setShowSolution';
const NEXT_LESSON = 'setNextLesson';
const PREV_LESSON = 'setPrevLesson';

import course from '../../public/content/course.json';

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
};

const getters = {
  currentContents(state) {
    return state.currentContents;
  },
  lessonContent(state) {
    return state.lessonContent;
  },
  solutionContent(state) {
    return state.solutionContent;
  },
  showSolution(state) {
    return state.showSolution;
  },
};

const actions = {
  async [GET_CURRENT_CONTENT]({ commit }, data) {
    await commit(GET_CURRENT_CONTENT, data);
  },
  async [GET_SOLUTION_CONTENT]({ commit }, data) {
    await commit(GET_SOLUTION_CONTENT, data);
  },
  async [SET_SHOW_SOLUTION]({ commit }, data) {
    await commit(SET_SHOW_SOLUTION, data);
  },
  async [NEXT_LESSON]({ commit }) {
    await commit(NEXT_LESSON);
  },
  async [PREV_LESSON]({ commit }) {
    await commit(PREV_LESSON);
  },
};

const mutations = {
  async [GET_CURRENT_CONTENT](state, payload) {
    state.showSolution = false;
    state.currentContents = payload;
    const response = await fetch(`../content/${payload.content}`);
    state.lessonContent = await response.text();
  },
  async [GET_SOLUTION_CONTENT](state, payload) {
    state.showSolution = true;
    const response = await fetch(`../content/${payload.solution}`);
    state.solutionContent = await response.text();
  },  
  async [SET_SHOW_SOLUTION](state, payload) {
    state.showSolution = payload;
  },
  async [NEXT_LESSON](state) {
    const lessons = course.lessons;
    let newLessonContent = {};
    for (let i = 0; i < lessons.length; i++) {
      for (let j = 0; j < lessons[i].children.length; j++) {
        if (lessons[i].children[j].slug === state.currentContents.slug) {
          if (j + 1 < lessons[i].children.length) {
            newLessonContent = lessons[i].children[j + 1];
          } else if (i + 1 < lessons.length && lessons[i + 1].children.length > 0) {
            newLessonContent = lessons[i + 1].children[0];
          } else {
            newLessonContent = lessons[0].children[0]; // reached last lesson
          }
        }
      }
    }
    state.currentContents = newLessonContent;
  },
  async [PREV_LESSON](state) {
    const lessons = course.lessons;
    let newLessonContent = {};
    for (let i = 0; i < lessons.length; i++) {
      for (let j = 0; j < lessons[i].children.length; j++) {
        if (lessons[i].children[j].slug === state.currentContents.slug) {
          if (j - 1 >= 0) {
            newLessonContent = lessons[i].children[j - 1];
          } else if (i - 1 >= 0 && lessons[i - 1].children.length > 0) {
            newLessonContent = lessons[i - 1].children[lessons[i - 1].children.length - 1];
          } else {
            newLessonContent = lessons[0].children[0]; // reached last lesson
          }
        }
      }
    }
    state.currentContents = newLessonContent;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
