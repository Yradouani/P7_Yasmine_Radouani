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
        meta: {
            title: 'Connexion'
        },
    },
    {
        name: 'forum',
        path: '/forum',
        component: Forum,
        meta: {
            title: 'Forum'
        },
    },
    {
        name: 'profile',
        path: '/profile',
        component: Profile,
        meta: {
            title: 'Profile'
        },
    },
    {
        name: 'notfound',
        path: '/:pathMatch(.*)',
        component: NotFound,
        meta: {
            title: 'Page introuvable'
        },
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to) => {
    document.title = to.meta.title; 
})

export default router;

