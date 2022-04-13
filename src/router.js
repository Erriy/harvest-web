import VueRouter from 'vue-router';
import login from './components/login';
import regist from './components/regist';
import home from './components/home';

const routes = [
    { path: '/', component: home },
    { path: '/home', component: home },
    { path: '/login', component: login },
    { path: '/regist', component: regist },
]

const router = new VueRouter({
    routes
})

export default router;