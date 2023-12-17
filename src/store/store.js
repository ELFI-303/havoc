import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    posts: [],
    user: null,
  },
  getters: {
    getUser: state => {
        return state.user;
    },
    posts: state => {
        return state.posts;
    },
    isAuthenticated: state => !!state.user,
  },
  mutations: {
    LOGOUT(state){
        state.user = null;
    },
    SET_USER(state, user){
        state.user = user;
    },
    SET_ITEMS (state, posts) {
        state.posts = posts;
    }
  },
  actions: {
  async loadPosts ({ commit },cursor) {
    console.log(cursor);
    try {
        const response = await axios.get('http://localhost:8080/test_hellolambda/all-messages', {params: {cursor: cursor}});
        commit('SET_ITEMS', response.data);
      } catch (error) {
        alert("Failed to send request cause of :" + error);
        console.log(error);
    }
    },
  async LogOut({commit}){
      commit('LOGOUT');
    },
  async addPost (dataPost) { 
      console.log(dataPost);
  
    },
  connectUser ({commit}, userdata) {
      commit('SET_USER', userdata);
    },
  },
});

export default store