import { createStore } from 'vuex';
import axios from 'axios';
const http = axios.create({
  baseURL: 'http://localhost:3000/api/auth'
});

// const request = axios.create({
//     baseURL: 'http://localhost:3000/api'
//   });

// --------
let user = localStorage.getItem('user');
if (!user) {
    user = {
        userId: -1,
        token: '',
    };
}else {
    try {
        user = JSON.parse(user);
        http.defaults.headers.common['Authorization'] = user.token;
    }catch (ex){
        user = {
        userId: -1,
        token: '',
    };
    }
    
}

const store = createStore ({
    state : {
        status: '',
        user: user,
        userInfos: {
            firstname: '',
            lastname: '',
            email: '',
            imageProfil: '',
            isAdmin: '',
        }
    },
    mutations : {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            http.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        userInfos: function (state, userInfos) {
            state.userInfos = userInfos;
        },
        logout: function (state) {
            state.user = {
                userId: -1,
                token: '',
            }
            localStorage.removeItem('user');
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
            var user = JSON.parse(localStorage.getItem('user'));
            console.log(user);
            console.log(user.userId);
            axios.get(`http://localhost:3000/api/users/${user.userId}`)
                .then(function (response) {
                    console.log(response.data.user)
                    commit('userInfos', response.data.user);
                })
                .catch(error => console.log(error))
            },
    },
});
export default store;