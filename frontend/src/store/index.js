import { createStore } from 'vuex';
import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://www.wawasensei.dev/api/demo-auth/'
});

let user = localStorage.getItems('user');
if (!user) {
    user = {
        userId: -1,
        token: '',
    };
}else {
    user = JSON.parse(user);
}

const store = createStore ({
    state : {
        status: '',
        user: user,
        userInfos: {
            firstname: '',
            lastname: '',
            email: '',
            picture: '',
        }
    },
    getters : {

    },
    mutations : {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        userInfos: function (state, userInfos) {
            state.userInfos = userInfos;
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
        },
        getUserInfos: ({commit}) => {
            instance.post('/infos')
                .then(function (response) {
                    commit('userInfos', response.data.infos);
                })
                .catch(function (){

                });
        }
    },
    modules : {
        
    }
});
export default store;