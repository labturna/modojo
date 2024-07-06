import { createStore } from 'vuex';
import users from './users.module';
import todos from './todos.module'
import posts from './posts.module'
import albums from './albums.module'
import app from './app.module'

export default createStore({
  modules: {
    app,  
    users,
    todos,
    posts,
    albums,
  }
});