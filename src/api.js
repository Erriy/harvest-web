const sha512 = require('js-sha512');
const axios = require('axios').default;

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:80/': window.location.origin + '/api';
const axios_client = axios.create({
    baseURL: host,
});


const user = {
    password_hash(username, password) {
        return sha512.sha512(`${username}:${password}@harvest`).toLowerCase();
    },
    async regist({
        username='',
        password='',
        invite_code=''
    }={}) {
        try {
            const res = await axios_client.post('/user/regist', {
                username,
                password: this.password_hash(username, password),
                invite_code
            });
            return res.data;
        } catch(e) {
            return e.response.data;
        }
    },
    async login({
        username='',
        password=''
    }) {
        try {
            const res = await axios_client.post('/user/login', {
                username,
                password: this.password_hash(username, password)
            });
            return res.data;
        } catch(e) {
            return e.response.data;
        }
    },
}


const api = {
    user,
};

export default {
    install(Vue) {
        Vue.prototype.$api = api;
    }
};