

const user = {
    async regist({
        username='',
        password='',
        invite_code=''
    }={}) {
        console.log(username, password, invite_code);
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