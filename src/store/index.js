import { createStore } from 'vuex';
import users from './users.module';
import todos from './todos.module'
import posts from './posts.module'
import albums from './albums.module'

export default createStore({
  modules: {
    users,
    todos,
    posts,
    albums
  }
});