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
        const res = await axios_client.post('/user/regist', {
            username,
            password: this.password_hash(username, password),
            invite_code
        });
        console.log(res.data());
    },
    async login({
        username='',
        password=''
    }) {
        console.log(username, password);
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