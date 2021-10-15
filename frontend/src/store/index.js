import { createStore } from 'vuex';
import axios from 'axios';
const http = axios.create({
  baseURL: 'https://localhost:3000/api/auth'
});

// --------
// let user = localStorage.getItems('user');
// if (!user) {
//     user = {
//         userId: -1,
//         token: '',
//     };
// }else {
//     try {
//         user = JSON.parse(user);
//         instance.defaults.headers.common['Authorization'] = user.token;
//     }catch (ex){
//         user = {
//         userId: -1,
//         token: '',
//     };
//     }
    
// }
// -------

const store = createStore ({
    state : {
        status: '',
        // user: user,
        user: {
            userId: -1,
            token: '',
        },
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
            http.defaults.headers.common['Authorization'] = user.token;
            // localStorage.setItem('user', JSON.stringify(user));
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
                http.post('/signup', user)
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
                http.post('/login', user)
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
            http.post('/users/:userid')
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