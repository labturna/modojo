import ApiService from "@/services/api.service";

// endpoints
import endpoints from '../constant/endpoints'

// action types
const GET_USER_ALBUMS = 'getUserAlbums';
const GET_ALBUMS_PHOTOS = 'getAlbumsPhotos';


const state = {
  userAlbums: [],
  albumsPhotos: [],
  getAlbumsPhotosLoading: false
}

const getters = {
  userAlbums(state) {
    return state.userAlbums
  },
  albumsPhotos(state) {
    return state.albumsPhotos
  },
}

const actions = {
  [GET_USER_ALBUMS](state, data) {
    state.commit(GET_USER_ALBUMS, data)
  },
  [GET_ALBUMS_PHOTOS](state, data) {
    state.commit(GET_ALBUMS_PHOTOS, data)
  },
}

const mutations = {
  async [GET_USER_ALBUMS](state, userId) {
    try {
      const response = await ApiService.get(`${endpoints.ALBUMS_ENDPOINT}?userId=${userId}`)
      state.userAlbums = response
      console.log('users albums', response)
    }
    catch (error) {
      console.log('(error at get users albums)', error)
    }
  },
  async [GET_ALBUMS_PHOTOS](state, albumId) {
    state.getAlbumsPhotosLoading = true
    try {
      const response = await ApiService.get(`${endpoints.PHOTOS_ENDPOINT}?albumId=${albumId}`)
      state.albumsPhotos = response
      state.getAlbumsPhotosLoading = false
      console.log('albums photos', response)
    }
    catch (error) {
      console.log('(error at get album photos)', error)
    }
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}
