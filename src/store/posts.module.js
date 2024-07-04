import ApiService from "@/services/api.service";

// endpoints
import endpoints from '../constant/endpoints'

// action types
const GET_USER_POSTS = 'getUserPosts';
const GET_POSTS_COMMENTS = 'getPostComments';

const state = {
    userPosts: [],
    userPostsLoading: false,
    postComments: [],
    postCommentsLoading: false
}

const getters = {
    userPosts(state) {
        return state.userPosts
    },
    userPostsLoading(state) {
        return state.userPostsLoading
    },
    postComments(state) {
        return state.postComments
    },
    postCommentsLoading(state) {
        return state.postCommentsLoading
    },
}

const actions = {
    [GET_USER_POSTS](state, data) {
        state.commit(GET_USER_POSTS, data)
    },
    [GET_POSTS_COMMENTS](state, data) {
        state.commit(GET_POSTS_COMMENTS, data)
    },
}

const mutations = {
    async [GET_USER_POSTS](state, userId) {
        state.userPostsLoading = true
        try {
            const response = await ApiService.get(`${endpoints.POSTS_ENDPOINT}?userId=${userId}`)
            state.userPosts = response
            state.userPostsLoading = false
        }
        catch (error) {
            // notification (swal) can be added
            console.log('(error at get users posts)', error)
        }
    },
    async [GET_POSTS_COMMENTS](state, postId) {
        state.postCommentsLoading = true
        try {
            const response = await ApiService.get(`${endpoints.POSTS_ENDPOINT}/${postId}/comments`)
            state.postComments = response
            state.postCommentsLoading = false
        }
        catch (error) {
            // notification (swal) can be added
            console.log('(error at get posts comments)', error)
        }
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}
