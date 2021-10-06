import { createStore } from 'vuex';
import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://www.wawasensei.dev/api/demo-auth/'
});

const store = createStore ({
    state : {

    },
    getters : {

    },
    mutations : {

    },
    actions : {
        createAccount: ({commit}, user) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/createAccount, user')
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error){
                    reject(error);
                });
                console.log(user);
            })
        },
        login: ({commit}, user) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/login, user')
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error){
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