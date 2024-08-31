const SET_CHALLENGE_PROBLEM_CONTENT = 'setChallengeProblemContent';
const SET_CHALLENGE_SOLUTION_CONTENT = 'setChallengeSolutionContent'

import Storage from '../services/localstorage';

const state = {
    currentChallenge: {},
    challengeProblemContent: "",
    challengeSolutionContent: ""
};

const getters = {
    challengeProblemContent(state) {
        return state.challengeProblemContent;
    },
    currentChallenge(state) {
        return state.currentChallenge;
    },
    challengeSolutionContent(state) {
        return state.challengeSolutionContent;
    },
};


const actions = {
    async [SET_CHALLENGE_PROBLEM_CONTENT]({ commit }, data) {
        await commit(SET_CHALLENGE_PROBLEM_CONTENT, data);
    },
    async [SET_CHALLENGE_SOLUTION_CONTENT]({ commit }, data) {
        await commit(SET_CHALLENGE_SOLUTION_CONTENT, data);
    },
};


const mutations = {
    async [SET_CHALLENGE_PROBLEM_CONTENT](state, payload) {
        state.currentChallenge = payload;
        const response = await fetch(`../${payload.content}`);
        state.challengeProblemContent = await response.text();

        Storage.save('currentChallenge', state.currentChallenge)
        Storage.save('currentChallengeContent', state.challengeProblemContent)
    },

    async [SET_CHALLENGE_SOLUTION_CONTENT](state, payload) {
        const response = await fetch(`../${payload.solution}`);
        state.challengeSolutionContent = await response.text();
    },
};


export default {
    state,
    actions,
    mutations,
    getters,
};
