import { createStore } from 'vuex';
import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://www.wawasensei.dev/api/demo-auth/'
});

const store = createStore ({
    state : {
        status: '',
        user: {
            userId: -1,
            token: '',
        }
    },
    getters : {

    },
    mutations : {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            state.user = user;
        }
    },
    actions : {
        createAccount: ({commit}, user) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/createAccount, user')
                .then(function (response) {
                    commit('setStatus', 'created');
                    resolve(response);
                })
                .catch(function (error){
                    commit('setStatus', 'error_create');
                    reject(error);
                });
                console.log(user);
            })
        },
        login: ({commit}, user) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/login, user')
                .then(function (response) {
                    commit('setStatus', '');
                    commit('logUser', response.data);
                    resolve(response);
                })
                .catch(function (error){
                    commit('setStatus', 'error_login');
                    reject(error);
                });
                console.log(user);
            })
        }
    },
    modules : {
        
    }
});
export default store;