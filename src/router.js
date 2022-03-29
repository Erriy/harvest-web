import VueRouter from 'vue-router';
import login from './components/login';

const routes = [
    { path: '/', component: login },
]

const router = new VueRouter({
    routes
})

export default router;