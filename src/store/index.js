import { createStore } from 'vuex';
import contents from './contents.module';
import app from './app.module'

export default createStore({
  modules: {
    app,  
    contents,
  }
});