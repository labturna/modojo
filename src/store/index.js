import { createStore } from 'vuex';
import users from './users.module';
import app from './app.module'

export default createStore({
  modules: {
    app,  
    users,
  }
});