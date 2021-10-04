import { createRouter, createWebHistory } from 'vue-router';
import Profile from '@/components/Profile.vue';
import Signin from '@/components/Signin.vue';
import Forum from '@/components/Forum.vue';
import NotFound from '@/components/NotFound.vue';

const routes = [
    {
        name: 'signin',
        path: '/',
        component: Signin,
    },
    {
        name: 'forum',
        path: '/forum',
        component: Forum,
    },
    {
        name: 'profile',
        path: '/profile',
        component: Profile,
    },
    {
        name: 'notfound',
        path: '/profile',
        component: NotFound,
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;

