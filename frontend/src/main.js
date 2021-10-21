import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import store from '@/store/'
import axios from "axios";

let userInLocalStorage = JSON.parse(localStorage.getItem('user'));

if(userInLocalStorage) {
    let token = userInLocalStorage.token
    axios.interceptors.request.use(config => {
        console.log(token)
        config.headers.authorization = `Bearer ${token}`;
        return config
    },
    error => {
        return Promise.reject(error);
    })
}


createApp(App).use(store).use(router).mount('#app')
