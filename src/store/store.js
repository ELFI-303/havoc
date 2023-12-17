import {createStore} from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        posts: [],
        id_token: undefined,
        access_token: undefined
    },
    getters: {
        getUser: state => {
            return {
                id_token: state.id_token,
                access_token: state.access_token
            };
        },
        posts: state => {
            return state.posts;
        },
        isAuthenticated: state => !!state.id_token,
    },
    mutations: {
        LOGOUT(state) {
            state.user = null;
        },
        SET_USER(state, user) {
            state.id_token = user.id_token;
            state.access_token = user.access_token;
        },
        SET_ITEMS(state, posts) {
            state.posts = posts;
        }
    },
    actions: {
        async loadPosts({commit, getters}, cursor) {
            try {
                const response = await axios.get('/all-messages', {
                    headers: {
                        Authorization: `Bearer ${getters.getUser.id_token}`
                    },
                    params: {
                        cursor: cursor
                    }
                });
                commit('SET_ITEMS', response.data);
            } catch (error) {
                alert("Failed to send request cause of :" + error);
                console.log(error);
            }
        },
        async LogOut({commit}) {
            commit('LOGOUT');
        },
        async addPost({dispatch, getters}, inputs) {
            const user_id = await dispatch("loadUserId")
            await axios.post('/messages', {
                user_id: user_id,
                message: inputs.message
            }, {
                headers: {
                    Authorization: `Bearer ${getters.getUser.id_token}`
                }
            });
        },
        async processCode({commit}, inputs) {
            const param = new URLSearchParams({
                grant_type: "authorization_code",
                client_id: "65ebu3b3qcvjci64if0n28l751",
                code: inputs.code,
                redirect_uri: encodeURI("https://di76j5myawn36.cloudfront.net/auth")
            });
            try {
                const response = await axios.post(
                    "https://havoc-messagerie.auth.eu-west-1.amazoncognito.com/oauth2/token",
                    param, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                commit("SET_USER", {
                    id_token: response.data.id_token,
                    access_token: response.data.access_token
                });
            } catch (e) {
                console.log("Erreur: ", e);
            }
        },
        async loadUserId({getters}) {
            try {
                const response = await axios.get(
                    "https://havoc-messagerie.auth.eu-west-1.amazoncognito.com/oauth2/userInfo", {
                        headers: {
                            Authorization: `Bearer ${getters.getUser.access_token}`
                        }
                    }
                );
                return response.data.sub;
            }catch (e) {
                console.log("Erreur :", e);
            }
        },
    },
});

export default store